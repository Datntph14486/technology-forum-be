import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';

import { AwsService } from './aws.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('upload')
@ApiBearerAuth('access-token')
@Controller('upload')
export class AwsController {
    constructor(private awsService: AwsService) {}

    @Post('upload-file')
    @UseInterceptors(FileInterceptor('file'))
    async upload(@UploadedFile() file: Express.Multer.File) {
        return await this.awsService.upload(file);
    }
}
