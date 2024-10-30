import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionEntity } from './question.entity';
import { IsNull, Repository } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UserService } from '../user/user.service';
import { NOT_FOUND_ERROR } from 'src/common/constants';

@Injectable()
export class QuestionService {
    constructor(
        @InjectRepository(QuestionEntity)
        private readonly questionRepository: Repository<QuestionEntity>,

        private userService: UserService,
    ) {}

    async create(dto: CreateQuestionDto) {
        const user = await this.userService.findById(dto.createdById);

        if (!user) {
            throw new NotFoundException(NOT_FOUND_ERROR.USER);
        }

        const question = await this.questionRepository.create({
            title: dto.title,
            content: dto.content,
            author: user,
            tags: dto?.tags,
        });

        const saveQuestion = await this.questionRepository.save(question);

        return saveQuestion;
    }

    async findById(questionId: number) {
        const question = await this.questionRepository.findOne({
            where: {
                id: questionId,
                deletedAt: IsNull(),
            },
        });

        if (!question) {
            throw new NotFoundException(NOT_FOUND_ERROR.QUESTION);
        }

        return question;
    }
}
