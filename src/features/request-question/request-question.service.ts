import { QuestionService } from './../question/question.service';
import {
    forwardRef,
    Inject,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestQuestionEntity } from './request-question.entity';
import { Repository } from 'typeorm';
import { CreateRequestQuestionDto } from './dto/create-request-question.dto';
import { NOT_FOUND_ERROR } from 'src/common/constants';
import { UserService } from '../user/user.service';
import { CreateQuestionDto } from '../question/dto/create-question.dto';
import { RejectRequestPostDto } from './dto/reject-request-post.dto';
import { REQUEST_QUESTION_STATUS } from './constants';

@Injectable()
export class RequestQuestionService {
    constructor(
        @InjectRepository(RequestQuestionEntity)
        private readonly requestQuestionRepository: Repository<RequestQuestionEntity>,

        private userService: UserService,

        @Inject(forwardRef(() => QuestionService))
        private questionService: QuestionService,
    ) {}

    async create(userId, dto: CreateRequestQuestionDto) {
        const user = await this.userService.findById(userId);

        if (!user) {
            throw new NotFoundException(NOT_FOUND_ERROR.USER);
        }

        const requestQuestion = await this.requestQuestionRepository.create({
            title: dto.title,
            content: dto.content,
            tags: dto?.tags,
            createdById: userId,
        });

        const saveQuestion =
            await this.requestQuestionRepository.save(requestQuestion);

        return saveQuestion;
    }

    async approve(requestQuestionId: number) {
        const requestQuestion = await this.requestQuestionRepository.findOne({
            where: {
                id: requestQuestionId,
            },
        });

        if (!requestQuestion) {
            throw new NotFoundException(NOT_FOUND_ERROR.USER);
        }

        const bodyData: CreateQuestionDto = {
            title: requestQuestion.title,
            content: requestQuestion.content,
            tags: requestQuestion?.tags,
            createdById: requestQuestion.createdById,
        };

        const question = await this.questionService.create(bodyData);

        if (question) {
            this.delete(requestQuestion.id);
        }
        return question;
    }

    async reject(requestQuestionId: number, dto: RejectRequestPostDto) {
        const requestQuestion = await this.requestQuestionRepository.findOne({
            where: {
                id: requestQuestionId,
            },
        });

        if (!requestQuestion) {
            throw new NotFoundException(NOT_FOUND_ERROR.USER);
        }

        const rejectQuestion = await this.requestQuestionRepository.update(
            { id: requestQuestion.id },
            {
                status: REQUEST_QUESTION_STATUS.REJECT,
                feedback: dto.feedback,
            },
        );

        return rejectQuestion;
    }

    async delete(requestQuestionId: number) {
        const requestQuestion = await this.requestQuestionRepository.findOne({
            where: {
                id: requestQuestionId,
            },
        });

        if (!requestQuestion) {
            throw new NotFoundException(NOT_FOUND_ERROR.USER);
        }

        return await this.requestQuestionRepository.delete({
            id: requestQuestionId,
        });
    }
}
