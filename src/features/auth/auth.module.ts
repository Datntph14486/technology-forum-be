import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { MailModule } from '../mail/mail.module';
import { RabbitMQModule } from '../rabbit-mq/rabbit-mq.module';
import { RabbitMQService } from '../rabbit-mq/rabbit-mq.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        MailModule,
        RabbitMQModule,
    ],
    controllers: [AuthController],
    providers: [ConfigService, AuthService, JwtService, RabbitMQService],
    exports: [AuthService],
})
export class AuthModule {}
