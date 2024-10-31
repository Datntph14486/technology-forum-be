import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    UseGuards,
} from '@nestjs/common';
import { RequestQuestionService } from './request-question.service';
import { getCurrentUserId } from '../auth/decorators';
import { CreateRequestQuestionDto } from './dto/create-request-question.dto';
import { RejectRequestPostDto } from './dto/reject-request-post.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/roles.guard';
import { Role } from 'src/common/constants';
import { Roles } from '../auth/decorators/roles.decorator';
@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('request-questions')
export class RequestQuestionController {
    constructor(
        private readonly requestQuestionService: RequestQuestionService,
    ) {}

    @Post('')
    @Roles([Role.ADMIN, Role.CUSTOMER])
    @HttpCode(HttpStatus.OK)
    async create(
        @getCurrentUserId() userId: number,
        @Body() dto: CreateRequestQuestionDto,
    ) {
        return await this.requestQuestionService.create(userId, dto);
    }

    @Post('approve/:id')
    @Roles([Role.ADMIN])
    @HttpCode(HttpStatus.OK)
    async approve(@Param('id') requestQuestionId: number) {
        return await this.requestQuestionService.approve(requestQuestionId);
    }

    @Post('reject/:id')
    @Roles([Role.ADMIN])
    @HttpCode(HttpStatus.OK)
    async reject(
        @Param('id') requestQuestionId: number,
        @Body() dto: RejectRequestPostDto,
    ) {
        return await this.requestQuestionService.reject(requestQuestionId, dto);
    }

    @Delete('/:id')
    @Roles([Role.ADMIN])
    @HttpCode(HttpStatus.OK)
    async delete(@Param('id') requestQuestionId: number) {
        return await this.requestQuestionService.delete(requestQuestionId);
    }
}
