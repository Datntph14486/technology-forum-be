import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationEntity } from './notification.entity';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { UserModule } from '../user/user.module';

@Module({
    imports: [TypeOrmModule.forFeature([NotificationEntity]), UserModule],
    controllers: [NotificationController],
    providers: [NotificationService],
    exports: [NotificationService],
})
export class NotificationModule {}
