import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

import { SendEmailDto } from './dto/send-email.dto';
import { emailTemplateNewAccount } from 'src/common/template/email-template-new-account';
import { SendEmailToNewAccountDto } from './dto/send-email-to-new-account.dto';
import { SERVICE_NAME } from 'src/common/constants';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}

    async send(dto: SendEmailDto) {
        await this.mailerService.sendMail({
            to: dto.target,
            subject: dto.subject,
            html: dto.content,
        });

        return { data: true };
    }

    async sendToNewAccount(newUserDto: SendEmailToNewAccountDto) {
        const template = emailTemplateNewAccount
            .replace('{user_name}', newUserDto.email)
            .replace('{name}', newUserDto.name)
            .replace('{service_name}', SERVICE_NAME)
            .replace('{service_name}', SERVICE_NAME)
            .replace('{password}', newUserDto.password);

        const data: SendEmailDto = {
            target: newUserDto.email,
            subject: `Welcome to ${SERVICE_NAME}`,
            content: template,
        };

        await this.send(data);

        return { data: true };
    }
}
