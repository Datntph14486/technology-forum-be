import {
    forwardRef,
    Inject,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswerEntity } from './answer.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { QuestionService } from '../question/question.service';
import { NOT_FOUND_ERROR } from 'src/common/constants';
import { UserService } from '../user/user.service';

@Injectable()
export class AnswerService {
    constructor(
        @InjectRepository(AnswerEntity)
        private readonly answerRepository: Repository<AnswerEntity>,

        @Inject(forwardRef(() => QuestionService))
        private questionService: QuestionService,

        private userService: UserService,
    ) {}

    async create(dto: CreateAnswerDto) {
        const question = await this.questionService.findById(dto.questionId);

        if (!question) {
            throw new NotFoundException(NOT_FOUND_ERROR.QUESTION);
        }

        const user = await this.userService.findById(dto.createById);

        if (!user) {
            throw new NotFoundException(NOT_FOUND_ERROR.USER);
        }

        const answer = await this.answerRepository.create({
            content: dto.content,
            author: user,
            question,
        });

        const saveAnswer = await this.answerRepository.save(answer);

        return saveAnswer;
    }

    async delete(userId: number, answerId: number): Promise<UpdateResult> {
        const user = await this.userService.findById(userId);

        if (!user) {
            throw new NotFoundException(NOT_FOUND_ERROR.USER);
        }

        const answer = await this.answerRepository.findOne({
            where: {
                id: answerId,
                author: user,
            },
        });

        if (!answer) {
            throw new NotFoundException(NOT_FOUND_ERROR.ANSWER);
        }

        const deleted = await this.answerRepository.update(answerId, {
            deletedAt: new Date(),
        });

        return deleted;
    }
}
