import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AwsService } from './aws.service';
import { AwsController } from './aws.controller';
import { FileModule } from '../file/file.module';
import { FileService } from '../file/file.service';
import { FileEntity } from '../file/file.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [FileModule],
    controllers: [AwsController],
    providers: [ConfigService, AwsService],
    exports: [AwsService],
})
export class AwsModule {}
