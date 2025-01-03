import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { MailModule } from '../mail/mail.module';
import { MailService } from '../mail/mail.service';
import { AwsModule } from '../aws/aws.module';
import { AwsService } from '../aws/aws.service';
import { FileModule } from '../file/file.module';
import { TemplateModule } from '../template/template.module';
import { RabbitMQService } from '../rabbit-mq/rabbit-mq.service';
import { RabbitMQModule } from '../rabbit-mq/rabbit-mq.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        AuthModule,
        MailModule,
        AwsModule,
        FileModule,
        TemplateModule,
        RabbitMQModule,
    ],
    controllers: [UserController],
    providers: [
        UserService,
        AuthService,
        MailService,
        AwsService,
        RabbitMQService,
    ],
    exports: [UserService],
})
export class UserModule {}
