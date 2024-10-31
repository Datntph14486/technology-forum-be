import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    UseGuards,
} from '@nestjs/common';

import { MailService } from './mail.service';
import { SendEmailDto } from './dto/send-email.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/roles.guard';
import { Role } from 'src/common/constants';
import { Roles } from '../auth/decorators/roles.decorator';
@ApiTags('mail')
@ApiBearerAuth('access-token')
@Controller('mail')
export class MailController {
    constructor(private mailService: MailService) {}

    @Post('send')
    @HttpCode(HttpStatus.OK)
    async send(@Body() dto: SendEmailDto) {
        return this.mailService.send(dto);
    }
}
