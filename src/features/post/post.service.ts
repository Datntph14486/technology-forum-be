import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { TechnologyService } from '../technology/technology.service';
import { NOT_FOUND_ERROR } from 'src/common/constants';
import { TopicService } from '../topic/topic.service';
import { UserService } from '../user/user.service';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(PostEntity)
        private readonly postRepository: Repository<PostEntity>,

        private technologyService: TechnologyService,

        private topicService: TopicService,

        private userService: UserService,
    ) {}

    async create(dto: CreatePostDto) {
        const technology = await this.technologyService.findById(
            dto.technologyId,
        );

        if (!technology) {
            throw new NotFoundException(NOT_FOUND_ERROR.TECHNOLOGY);
        }

        const topic = await this.topicService.findById(dto.topicId);

        if (!topic) {
            throw new NotFoundException(NOT_FOUND_ERROR.TOPIC);
        }

        const user = await this.userService.findById(dto.userId);

        if (!user) {
            throw new NotFoundException(NOT_FOUND_ERROR.USER);
        }

        const post = await this.postRepository.create({
            title: dto.title,
            content: dto.content,
            tags: dto.tags,
            topic: topic,
            author: user,
        });

        const newPost = await this.postRepository.save(post);

        return newPost;
    }
}
