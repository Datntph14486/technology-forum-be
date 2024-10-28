import { Body, Controller, Post } from '@nestjs/common';

import { MailService } from './mail.service';
import { SendEmailDto } from './dto/send-email.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('mail')
@ApiBearerAuth('access-token')
@Controller('mail')
export class MailController {
    constructor(private mailService: MailService) {}

    @Post('send')
    async send(@Body() dto: SendEmailDto) {
        return this.mailService.send(dto);
    }
}
