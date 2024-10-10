import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AwsService } from './aws.service';
import { AwsController } from './aws.controller';

@Module({
    controllers: [AwsController],
    providers: [ConfigService, AwsService],
    exports: [AwsService],
})
export class AwsModule {}
