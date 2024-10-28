import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { RequestPostEntity } from './request-post.entity';
import { CreateRequestPostDto } from './dto/create-request-post.dto';
import { NOT_FOUND_ERROR } from 'src/common/constants';
import { CreatePostDto } from '../post/dto/create-post.dto';
import { PostService } from '../post/post.service';
import { PostEntity } from '../post/post.entity';
import { REQUEST_POST_STATUS } from './constants';
import { RejectDto } from './dto/reject.dto';

@Injectable()
export class RequestPostService {
    constructor(
        @InjectRepository(RequestPostEntity)
        private readonly requestPostEntity: Repository<RequestPostEntity>,

        private postService: PostService,
    ) {}

    async create(
        userId: number,
        dto: CreateRequestPostDto,
    ): Promise<RequestPostEntity> {
        const requestPost = await this.requestPostEntity.create({
            title: dto.title,
            content: dto.content,
            tags: dto.tags,
            topicId: dto.topicId,
            created_by_id: userId,
        });

        const newPost = await this.requestPostEntity.save(requestPost);

        return newPost;
    }

    async approve(requestPostId: number): Promise<PostEntity> {
        const requestPost = await this.requestPostEntity.findOne({
            where: {
                id: requestPostId,
            },
        });

        if (!requestPost) {
            throw new NotFoundException(NOT_FOUND_ERROR.POST);
        }

        const postData: CreatePostDto = {
            title: requestPost.title,
            content: requestPost.content,
            topicId: requestPost.topicId,
            technologyId: requestPost.technologyId,
            tags: requestPost.tags,
            userId: requestPost.created_by_id,
        };

        const newPost = await this.postService.create(postData);

        if (newPost) {
            this.delete(requestPost.id);
        }

        return newPost;
    }

    async delete(requestPostId: number): Promise<DeleteResult> {
        const requestPost = await this.requestPostEntity.findOne({
            where: {
                id: requestPostId,
            },
        });

        if (!requestPost) {
            throw new NotFoundException(NOT_FOUND_ERROR.POST);
        }

        const deletedPost = await this.requestPostEntity.delete({
            id: requestPostId,
        });

        return deletedPost;
    }

    async getPendingPosts(): Promise<RequestPostEntity[]> {
        const requestPost = await this.requestPostEntity.find({
            where: {
                status: REQUEST_POST_STATUS.PENDING,
            },
        });

        return requestPost;
    }

    async reject(requestPostId: number, dto: RejectDto): Promise<UpdateResult> {
        const requestPost = await this.requestPostEntity.findOne({
            where: {
                id: requestPostId,
            },
        });

        if (!requestPost) {
            throw new NotFoundException(NOT_FOUND_ERROR.POST);
        }

        const updatedReqPost = await this.requestPostEntity.update(
            { id: requestPost.id },
            {
                feedback: dto.feedback,
                status: REQUEST_POST_STATUS.REJECT,
            },
        );

        return updatedReqPost;
    }
}
