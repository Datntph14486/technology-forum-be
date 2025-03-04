import { DeviceTokenEntity } from './device-token.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDeviceTokenDto } from './dto/create-device-token.dto';
import { UserService } from '../user/user.service';
import { NOT_FOUND_ERROR } from 'src/common/constants';

@Injectable()
export class DeviceTokenService {
    constructor(
        @InjectRepository(DeviceTokenEntity)
        private readonly deviceTokenRepository: Repository<DeviceTokenEntity>,

        private readonly userService: UserService,
    ) {}

    async create(dto: CreateDeviceTokenDto): Promise<DeviceTokenEntity> {
        const user = await this.userService.findById(dto.targetId);

        if (!user) {
            throw new NotFoundException(NOT_FOUND_ERROR.USER);
        }

        const deviceToken = await this.deviceTokenRepository.create({
            deviceType: dto.deviceType,
            deviceName: dto.deviceName,
            deviceToken: dto.deviceToken,
            target: user,
        });

        const saveDeviceToken =
            await this.deviceTokenRepository.save(deviceToken);

        return saveDeviceToken;
    }

    // async findByUsersId(id: number): Promise<DeviceTokenEntity[]>{
    //     const deviceTokens = await this.deviceTokenRepository.find({
    //         where: {
    //             target
    //         }
    //     })
    // }
}
