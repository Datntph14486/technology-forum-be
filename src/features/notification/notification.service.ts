import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationEntity } from './notification.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { CreateNotificationDto } from './dto/create-noti.dto';
import { NOT_FOUND_ERROR } from 'src/common/constants';

@Injectable()
export class NotificationService {
    constructor(
        @InjectRepository(NotificationEntity)
        private readonly notificationRepository: Repository<NotificationEntity>,

        private userService: UserService,
    ) {}

    async create(dto: CreateNotificationDto) {
        const user = await this.userService.findById(dto.targetId);

        if (!user) {
            throw new NotFoundException(NOT_FOUND_ERROR.USER);
        }

        const notification = await this.notificationRepository.create({
            title: dto.title,
            body: dto.body,
            data: dto.data,
            type: dto.type,
            target: user,
        });

        const newNoti = await this.notificationRepository.save(notification);

        this.userService.update(user.id, {
            totalUnreadNotification: user.totalUnreadNotification + 1,
        });

        return newNoti;
    }

    async getNotificationByUserId(userId: number) {
        const user = await this.userService.findById(userId);

        if (!user) {
            throw new NotFoundException(NOT_FOUND_ERROR.USER);
        }

        const notifications = await this.notificationRepository.find({
            where: {
                target: user,
            },
            order: {
                createdAt: 'DESC',
            },
        });

        this.userService.update(user.id, { totalUnreadNotification: 0 });

        return notifications;
    }
}
