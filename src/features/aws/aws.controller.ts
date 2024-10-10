import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { AwsService } from './aws.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class AwsController {
    constructor(private awsService: AwsService) {}

    @Post('upload-file')
    @UseInterceptors(FileInterceptor('file'))
    async upload(@UploadedFile() file) {
        return await this.awsService.upload(file);
    }
}
