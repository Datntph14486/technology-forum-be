import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, NotFoundException } from '@nestjs/common';

import { SendEmailDto } from './dto/send-email.dto';
import { SendEmailToNewAccountDto } from './dto/send-email-to-new-account.dto';
import { NOT_FOUND_ERROR, SERVICE_NAME } from 'src/common/constants';
import { TemplateService } from '../template/template.service';
import { TEMPLATE_TYPE } from '../template/constants';
import buildEmailTemplate from 'src/common/util/build-email-template';

@Injectable()
export class MailService {
    constructor(
        private mailerService: MailerService,

        private readonly templateService: TemplateService,
    ) {}

    async send(dto: SendEmailDto) {
        await this.mailerService.sendMail({
            to: dto.target,
            subject: dto.subject,
            html: dto.content,
        });

        return { data: true };
    }

    async sendToNewAccount(newUserDto: SendEmailToNewAccountDto) {
        const template = await this.templateService.findByType(
            TEMPLATE_TYPE.NEW_ACCOUNT,
        );

        if (!template) {
            throw new NotFoundException(NOT_FOUND_ERROR.TEMPLATE);
        }

        const content = buildEmailTemplate(template.body, {
            user_name: newUserDto.email,
            name: newUserDto.name,
            service_name: SERVICE_NAME,
            password: newUserDto.password,
        });

        const data: SendEmailDto = {
            target: newUserDto.email,
            subject: template.subject,
            content,
        };

        await this.send(data);

        return { data: true };
    }
}
