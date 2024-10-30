import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswerEntity } from './answer.entity';
import { Repository } from 'typeorm';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { QuestionService } from '../question/question.service';
import { NOT_FOUND_ERROR } from 'src/common/constants';
import { UserService } from '../user/user.service';

@Injectable()
export class AnswerService {
    constructor(
        @InjectRepository(AnswerEntity)
        private readonly answerRepository: Repository<AnswerEntity>,

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
}
