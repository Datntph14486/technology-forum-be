import _ from 'lodash';

import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import admin, { app } from 'firebase-admin';
import { SendNotificationDto } from './dto/send-notification.dto';
import { BroadCastNotificationDto } from './dto/broadcast-notification.dto';
import { ClientProxy } from '@nestjs/microservices';
import { QueueName } from 'src/common/constants';
import { DEVICE_TYPE, DeviceToken } from './constants';
import { UserService } from '../user/user.service';

type Token = {
    deviceToken: string;
    customerId: number;
    deviceType: string;
};

@Injectable()
export class FirebaseService {
    firebaseService: app.App;
    constructor(
        private configService: ConfigService,

        private readonly userService: UserService,

        @Inject('RABBITMQ_CLIENT')
        private readonly rabbitmqClient: ClientProxy,
    ) {
        const config = this.configService.get<string>('firebase');
        console.log(config);
        this.firebaseService = admin.initializeApp({
            credential: admin.credential.cert(config),
        });
    }

    async pushNotification(dto: SendNotificationDto) {
        try {
            await this.rabbitmqClient
                .send(QueueName.FIREBASE_NOTIFICATION, JSON.stringify(dto))
                .toPromise();
        } catch (error) {
            throw new BadRequestException(error?.message);
        }
    }

    async broadCastNotification(dto: BroadCastNotificationDto) {
        const { customer_ids, title, body, type, data } = dto;

        try {
            const deviceTokens: any[] = [];

            if (deviceTokens.length) {
                const tokens: DeviceToken[] = deviceTokens.map((d) => {
                    return {
                        deviceToken: d.device_token,
                        customerId: d.customerId,
                        deviceType: d.device_type,
                    };
                });

                const tokensActive: DeviceToken[] = this.getUniqueToken(tokens);

                // // write notifications histories
                // const subParticipantSize = 100;
                // const subParticipants = _.chunk(
                //     tokensActive,
                //     subParticipantSize,
                // );

                const iosDevices: string[] = [];
                const androidDevices: string[] = [];

                for (let i = 0; i < tokensActive.length; i++) {
                    const deviceType: DEVICE_TYPE = tokensActive[i].deviceType;

                    switch (deviceType) {
                        case DEVICE_TYPE.IOS:
                            iosDevices.push(tokensActive[i].deviceToken);
                            break;
                        case DEVICE_TYPE.ANDROID:
                            androidDevices.push(tokensActive[i].deviceToken);
                            break;
                        default:
                            break;
                    }
                }

                const response = {};

                if (iosDevices.length) {
                    try {
                        // push noti to ios devices
                        response['ios'] =
                            await this.broadCastNotificationToDeviceIOS(
                                iosDevices,
                                dto,
                            );
                    } catch (error) {
                        console.log('🚀 ~ error send ios devices:', error);
                    }
                }

                if (androidDevices.length) {
                    try {
                        // push noti to android devices
                        response['android'] =
                            await this.broadCastNotificationToDeviceAndroid(
                                deviceTokens,
                                dto,
                            );
                    } catch (error) {
                        console.log('🚀 ~ error send android devices:', error);
                    }
                }

                return response;
            }
        } catch (error) {
            console.log('🚀 ~ error broad cast notifications:', error);
        }
    }

    async sendToTopic() {}

    private async sendNotificationToDeviceIOS(
        token: string,
        { title, body, data, type, imageUrl }: SendNotificationDto,
    ) {}

    private async sendNotificationToDeviceAndroid(
        token: string,
        dto: SendNotificationDto,
    ) {
        const { title, body, data, type, imageUrl } = dto;
    }

    // push multi devices
    private async broadCastNotificationToDeviceIOS(
        tokens: string[],
        dto: BroadCastNotificationDto,
    ): Promise<string> {
        const { title, body, data, type } = dto;
        let successTotal = 0;
        let failureTotal = 0;

        while (tokens.length !== 0) {
            const message = {
                tokens: tokens.splice(0, 500),
                notification: {
                    title,
                    body,
                },
                apns: {
                    headers: {
                        'apns-priority': '10', // Ưu tiên cao
                    },
                    payload: {
                        aps: {
                            alert: {
                                title,
                                subtitle: data.subTitle,
                                body,
                            },
                            sound: 'default', // Âm thanh thông báo
                            mutableContent: true, // Cho phép thay đổi nội dung
                        },
                    },
                },
                data,
            };

            const { successCount, failureCount } = await this.firebaseService
                .messaging()
                .sendEachForMulticast(message);

            successTotal += successCount;
            failureTotal += failureCount;
        }

        return `IOS Smessage success: ${successTotal}, message fail: ${failureTotal}`;
    }

    private async broadCastNotificationToDeviceAndroid(
        tokens: string[],
        dto: BroadCastNotificationDto,
    ) {
        const { title, body, data, type } = dto;
        let successTotal = 0;
        let failureTotal = 0;

        while (tokens.length !== 0) {
            const message = {
                tokens,
                notification: {
                    title,
                    body,
                },
                android: {
                    notification: {
                        channelId: 'default_channel',
                        title,
                        body,
                    },
                },
                data,
            };

            const { successCount, failureCount } = await this.firebaseService
                .messaging()
                .sendEachForMulticast(message);

            successTotal += successCount;
            failureTotal += failureCount;
        }

        return `Android message success: ${successTotal}, message fail: ${failureTotal}`;
    }

    private getUniqueToken(tokens: Token[]): DeviceToken[] {
        const uniqueItems = new Map();

        tokens.forEach((item) => {
            uniqueItems.set(item.customerId, item);
        });

        return Array.from(uniqueItems.values());
    }
}
