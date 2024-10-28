import { Module } from '@nestjs/common';
import { TechnologyModule } from '../technology/technology.module';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './post.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([PostEntity]),
        TechnologyModule,
        TechnologyModule,
    ],
    controllers: [PostController],
    providers: [PostService],
    exports: [PostService],
})
export class PostModule {}
