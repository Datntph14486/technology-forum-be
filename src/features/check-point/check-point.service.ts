import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CheckPointEntity } from './check-point.entity';
import { Repository } from 'typeorm';
import { PostEntity } from '../post/post.entity';
import { DiscussEntity } from '../discuss/discuss.entity';
import { QuestionEntity } from '../question/question.entity';
import { AnswerEntity } from '../answer/answer.entity';
import { IncrementOrReducePointsDto } from './dto/increment-points-or-reduce.dto';
import { NOT_FOUND_ERROR } from 'src/common/constants';
import { RELATED_TYPE } from './constants';
import { UserService } from '../user/user.service';

@Injectable()
export class CheckPointService {
    private repository: Record<string, Repository<any>>;
    private contentType: Record<string, RELATED_TYPE>;

    constructor(
        @InjectRepository(CheckPointEntity)
        private readonly checkPointRepository: Repository<CheckPointEntity>,

        @InjectRepository(PostEntity)
        private readonly postRepository: Repository<PostEntity>,

        @InjectRepository(DiscussEntity)
        private readonly discussRepository: Repository<DiscussEntity>,

        @InjectRepository(QuestionEntity)
        private readonly questionRepository: Repository<QuestionEntity>,

        @InjectRepository(AnswerEntity)
        private readonly answerRepository: Repository<AnswerEntity>,

        private userService: UserService,
    ) {
        this.repository = {
            post: this.postRepository,
            discuss: this.discussRepository,
            question: this.questionRepository,
            answer: this.answerRepository,
        };

        this.contentType = {
            post: RELATED_TYPE.POST,
            discuss: RELATED_TYPE.DISCUSS,
            question: RELATED_TYPE.QUESTION,
            answer: RELATED_TYPE.ANSWER,
        };
    }

    async incrementPoints(userId: number, dto: IncrementOrReducePointsDto) {
        const repository = await this.repository[dto.relatedType];
        const contentType = await this.contentType[dto.relatedType];
        const user = await this.userService.findById(userId);

        if (!user) {
            throw new NotFoundException(NOT_FOUND_ERROR.USER);
        }

        if (!contentType) {
            throw new NotFoundException(
                NOT_FOUND_ERROR.CONTENT_INCREMENT_POINT,
            );
        }

        if (!repository) {
            throw new NotFoundException(NOT_FOUND_ERROR.REPOSITORY);
        }

        const content = await repository.findOne({
            where: {
                id: dto.relatedId,
            },
        });

        if (!content) {
            throw new NotFoundException(
                NOT_FOUND_ERROR.CONTENT_INCREMENT_POINT,
            );
        }

        const checkPoint = await this.checkPointRepository.findOne({
            where: {
                relatedType: contentType,
                relatedId: content.id,
                author: user,
            },
        });

        if (!checkPoint) {
            const newCheckPoint = await this.checkPointRepository.create({
                relatedId: content.id,
                relatedType: contentType,
                author: user,
            });

            await this.checkPointRepository.save(newCheckPoint);

            await repository.increment({ id: content.id }, 'point', 1);
        } else {
            return true;
        }

        return true;
    }

    async reducePoints(userId: number, dto: IncrementOrReducePointsDto) {
        const repository = await this.repository[dto.relatedType];
        const contentType = await this.contentType[dto.relatedType];
        const user = await this.userService.findById(userId);

        if (!user) {
            throw new NotFoundException(NOT_FOUND_ERROR.USER);
        }

        if (!contentType) {
            throw new NotFoundException(
                NOT_FOUND_ERROR.CONTENT_INCREMENT_POINT,
            );
        }

        if (!repository) {
            throw new NotFoundException(NOT_FOUND_ERROR.REPOSITORY);
        }

        const content = await repository.findOne({
            where: {
                id: dto.relatedId,
            },
        });

        if (!content) {
            throw new NotFoundException(
                NOT_FOUND_ERROR.CONTENT_INCREMENT_POINT,
            );
        }

        const checkPoint = await this.checkPointRepository.findOne({
            where: {
                relatedType: contentType,
                relatedId: content.id,
                author: user,
            },
        });

        if (!checkPoint) {
            return true;
        } else {
            await this.checkPointRepository.delete({ id: checkPoint.id });

            await repository.decrement({ id: content.id }, 'point', 1);
        }

        return true;
    }
}
