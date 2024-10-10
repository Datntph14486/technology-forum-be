import { S3 } from 'aws-sdk';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AwsService {
    private s3: S3;
    private BUCKET: string;

    constructor(private configService: ConfigService) {
        this.s3 = new S3({
            accessKeyId: this.configService.get('aws').accessKey,
            secretAccessKey: this.configService.get('aws').accessSecret,
            region: this.configService.get('aws').region,
        });
        this.BUCKET = this.configService.get('aws').bucket;
    }

    async upload(file) {
        const { originalname } = file;

        return await this.uploadS3(file.buffer, this.BUCKET, originalname);
    }

    async uploadS3(file, bucket, name): Promise<any> {
        return {
            data: await this.s3
                .putObject({
                    Bucket: bucket,
                    Body: file,
                    Key: `${new Date().getTime()}_${name}`,
                    ContentType: 'image/jpeg',
                })
                .promise()
                .then((res) => {
                    console.log('Upload succeed', res);
                })
                .catch((err) => {
                    console.log('err: ', err);
                }),
        };
    }
}
