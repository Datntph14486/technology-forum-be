import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DiscussEntity } from './discuss.entity';
import { IsNull, Repository } from 'typeorm';
import { CreateDiscussDto } from './dto/create.discuss.dto';
import { UserService } from '../user/user.service';
import { NOT_FOUND_ERROR } from 'src/common/constants';
import { PostService } from '../post/post.service';

@Injectable()
export class DiscussService {
    constructor(
        @InjectRepository(DiscussEntity)
        private readonly discussRepository: Repository<DiscussEntity>,

        private userService: UserService,

        private postService: PostService,
    ) {}

    async create(userId: number, dto: CreateDiscussDto) {
        const user = await this.userService.findById(userId);

        if (!user) {
            throw new NotFoundException(NOT_FOUND_ERROR.USER);
        }

        const post = await this.postService.findById(dto.postId);

        if (!post) {
            throw new NotFoundException(NOT_FOUND_ERROR.POST);
        }

        const replyId = dto.replyToDiscussId;

        let discussParent = null;

        if (replyId) {
            discussParent = await this.discussRepository.findOne({
                where: {
                    id: replyId,
                },
            });

            if (!discussParent) {
                throw new NotFoundException(NOT_FOUND_ERROR.DISCUSS);
            }
        }

        const newDisCuss = await this.discussRepository.create({
            content: dto.content,
            parent: discussParent ? discussParent : null,
            author: user,
            post: post,
        });

        const saveDiscuss = await this.discussRepository.save(newDisCuss);

        return saveDiscuss;
    }

    async increasePoint(userId: number, discussId: number) {
        const discuss = await this.discussRepository.findOne({
            where: {
                id: discussId,
            },
        });

        if (!discuss) {
            throw new NotFoundException(NOT_FOUND_ERROR.DISCUSS);
        }

        const detailPoint = JSON.parse(discuss.detailPoint);

        if (!detailPoint?.likedBy) {
            const detail = { likedBy: [userId] };

            const newDisCuss = await this.discussRepository.update(
                { id: discuss.id },
                {
                    detailPoint: JSON.stringify(detail),
                    point: discuss.point + 1,
                },
            );

            return newDisCuss;
        }

        if (detailPoint.likedBy.includes(userId)) {
            return true;
        } else {
            const detail = { likedBy: [...detailPoint.likedBy, userId] };

            const newDisCuss = await this.discussRepository.update(
                { id: discuss.id },
                {
                    detailPoint: JSON.stringify(detail),
                    point: discuss.point + 1,
                },
            );

            return newDisCuss;
        }
    }

    async reducePoint(userId: number, discussId: number) {
        const discuss = await this.discussRepository.findOne({
            where: {
                id: discussId,
            },
        });

        if (!discuss) {
            throw new NotFoundException(NOT_FOUND_ERROR.DISCUSS);
        }

        const detailPoint = JSON.parse(discuss.detailPoint);

        if (detailPoint?.likedBy && detailPoint?.likedBy.includes(userId)) {
            const detail = detailPoint.likedBy.filter(
                (id: number) => id !== userId,
            );

            const newDisCuss = await this.discussRepository.update(
                { id: discuss.id },
                {
                    detailPoint: JSON.stringify(detail),
                    point: discuss.point - 1,
                },
            );

            return newDisCuss;
        } else {
            return true;
        }
    }

    async getDiscussByPostId(postId: number) {
        const post = await this.postService.findById(postId);

        if (!post) {
            throw new NotFoundException(NOT_FOUND_ERROR.POST);
        }

        const discuss = await this.discussRepository.find({
            where: {
                post: {
                    id: post.id,
                },
                deletedAt: IsNull(),
            },
            order: {
                createdAt: 'DESC',
            },
        });

        return discuss;
    }

    async getDisCussByParentId(parentId: number) {
        const discussParent = await this.discussRepository.findOne({
            where: {
                id: parentId,
            },
        });

        if (!discussParent) {
            throw new NotFoundException(NOT_FOUND_ERROR.DISCUSS);
        }

        const discuss = await this.discussRepository.find({
            where: {
                parent: {
                    id: discussParent.id,
                },
                deletedAt: IsNull(),
            },
            order: {
                createdAt: 'DESC',
            },
        });

        return discuss;
    }
}
