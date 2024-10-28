import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RequestPostService } from './request-post.service';
import { RequestPostEntity } from './request-post.entity';
import { RequestPostController } from './request-post.controller';
import { PostModule } from '../post/post.module';

@Module({
    imports: [TypeOrmModule.forFeature([RequestPostEntity]), PostModule],
    controllers: [RequestPostController],
    providers: [RequestPostService],
    exports: [RequestPostService],
})
export class RequestPostModule {}
