import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
} from '@nestjs/common';
import { RequestQuestionService } from './request-question.service';
import { getCurrentUserId } from '../auth/decorators';
import { CreateRequestQuestionDto } from './dto/create-request-question.dto';
import { RejectRequestPostDto } from './dto/reject-request-post.dto';

@Controller('request-questions')
export class RequestQuestionController {
    constructor(
        private readonly requestQuestionService: RequestQuestionService,
    ) {}

    @Post('')
    @HttpCode(HttpStatus.OK)
    async create(
        @getCurrentUserId() userId: number,
        @Body() dto: CreateRequestQuestionDto,
    ) {
        return await this.requestQuestionService.create(userId, dto);
    }

    @Post('approve/:id')
    @HttpCode(HttpStatus.OK)
    async approve(@Param('id') requestQuestionId: number) {
        return await this.requestQuestionService.approve(requestQuestionId);
    }

    @Post('reject/:id')
    async reject(
        @Param('id') requestQuestionId: number,
        @Body() dto: RejectRequestPostDto,
    ) {
        return await this.requestQuestionService.reject(requestQuestionId, dto);
    }

    @Delete('/:id')
    async delete(@Param('id') requestQuestionId: number) {
        return await this.requestQuestionService.delete(requestQuestionId);
    }
}
