import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestPostEntity } from './request-post.entity';
import { CreateRequestPostDto } from './dto/create-request-post.dto';
import { NOT_FOUND_ERROR } from 'src/common/constants';

@Injectable()
export class RequestPostService {
    constructor(
        @InjectRepository(RequestPostEntity)
        private readonly userRepository: Repository<RequestPostEntity>,
    ) {}

    async create(
        userId: number,
        dto: CreateRequestPostDto,
    ): Promise<RequestPostEntity> {
        const requestPost = await this.userRepository.create({
            title: dto.title,
            content: dto.content,
            tags: dto.tags,
            topicId: dto.topicId,
            created_by_id: userId,
        });

        const newPost = await this.userRepository.save(requestPost);

        return newPost;
    }

    async approve(requestPostId: number): Promise<boolean> {
        const post = await this.userRepository.find({
            where: {
                id: requestPostId,
            },
        });

        if (!post) {
            throw new NotFoundException(NOT_FOUND_ERROR.POST);
        }

        const postData = {};

        return true;
    }
}
