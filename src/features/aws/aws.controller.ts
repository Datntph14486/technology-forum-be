import {
    Controller,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';

import { AwsService } from './aws.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from 'src/common/constants';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/roles.guard';
@ApiTags('upload')
@ApiBearerAuth('access-token')
@Controller('upload')
export class AwsController {
    constructor(private awsService: AwsService) {}

    @Roles([Role.ADMIN, Role.CUSTOMER])
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Post('upload-file')
    @UseInterceptors(FileInterceptor('file'))
    async upload(@UploadedFile() file: Express.Multer.File) {
        return await this.awsService.upload(file);
    }
}
