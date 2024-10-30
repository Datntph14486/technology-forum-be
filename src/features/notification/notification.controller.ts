import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-noti.dto';

@Controller('notifications')
export class NotificationController {
    constructor(private notificationService: NotificationService) {}

    @Post('')
    @HttpCode(HttpStatus.OK)
    async create(@Body() dto: CreateNotificationDto) {
        return this.notificationService.create(dto);
    }

    @Get('get-by-user/:id')
    @HttpCode(HttpStatus.OK)
    async getNotificationByUserId(@Param('id') userId: number) {
        return this.notificationService.getNotificationByUserId(userId);
    }
}
