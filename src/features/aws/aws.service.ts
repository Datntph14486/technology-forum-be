import { S3 } from 'aws-sdk';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileService } from '../file/file.service';
import { CreateFileDto } from '../file/dto/create-file.dto';

@Injectable()
export class AwsService {
    private s3: S3;
    private BUCKET: string;

    constructor(
        private configService: ConfigService,

        private readonly fileService: FileService,
    ) {
        this.s3 = new S3({
            accessKeyId: this.configService.get('aws').accessKey,
            secretAccessKey: this.configService.get('aws').accessSecret,
            region: this.configService.get('aws').region,
        });
        this.BUCKET = this.configService.get('aws').bucket;
    }

    async upload(file) {
        const { originalname } = file;

        return await this.uploadS3(file, this.BUCKET, originalname);
    }

    async uploadS3(file, bucket: string, name: string): Promise<any> {
        const key = `${new Date().getTime()}_${name}`;

        await this.s3
            .putObject({
                Bucket: bucket,
                Body: file.buffer,
                Key: key,
                ContentType: file.mimetype,
            })
            .promise();

        const url = `https://${bucket}.s3.amazonaws.com/${key}`;

        const fileData: CreateFileDto = {
            name: key,
            width: 10,
            height: 10,
            mime: file.mimetype,
            size: file.size,
            url,
        };

        const newFile = await this.fileService.create(fileData);

        return newFile;
    }
}
