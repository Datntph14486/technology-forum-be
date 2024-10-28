import { Module } from '@nestjs/common';
import { TechnologyModule } from '../technology/technology.module';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './post.entity';
import { TopicModule } from '../topic/topic.module';
import { UserModule } from '../user/user.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([PostEntity]),
        TechnologyModule,
        TopicModule,
        UserModule,
    ],
    controllers: [PostController],
    providers: [PostService],
    exports: [PostService],
})
export class PostModule {}
