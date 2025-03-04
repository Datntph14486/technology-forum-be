import { Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { FirebaseController } from './firebase.controller';
import { ConfigService } from '@nestjs/config';
import { NotificationModule } from '../notification/notification.module';
import { RabbitMQModule } from '../rabbit-mq/rabbit-mq.module';
import { UserModule } from '../user/user.module';

@Module({
    imports: [NotificationModule, RabbitMQModule, UserModule],
    controllers: [FirebaseController],
    providers: [FirebaseService, ConfigService],
    exports: [FirebaseService],
})
export class FirebaseModule {}
