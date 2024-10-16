import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';

import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        MailerModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                transport: {
                    host: configService.get<string>('mail.host'),
                    secure: false,
                    auth: {
                        user: configService.get<string>('mail.user'),
                        pass: configService.get<string>('mail.password'),
                    },
                },
                defaults: {
                    from: '"No Reply" <noreply@example.com>',
                },
            }),
        }),
    ],
    controllers: [MailController],
    providers: [MailService],
    exports: [MailService],
})
export class MailModule {}