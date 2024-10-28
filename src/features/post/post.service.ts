import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { TechnologyService } from '../technology/technology.service';
import { NOT_FOUND_ERROR } from 'src/common/constants';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(PostEntity)
        private readonly postRepository: Repository<PostEntity>,

        private technologyService: TechnologyService,
    ) {}

    async create(dto: CreatePostDto) {
        // const technology = await this.technologyService.findById(
        //     dto.technologyId,
        // );

        // if (!technology) {
        //     throw new NotFoundException(NOT_FOUND_ERROR.TECHNOLOGY);
        // }

        const post = await this.postRepository.create({
            title: dto.title,
            content: dto.content,
            tags: dto.tags,
        });

        const newPost = await this.postRepository.save(post);

        return newPost;
    }
}
