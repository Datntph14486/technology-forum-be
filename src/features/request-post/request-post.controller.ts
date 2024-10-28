import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
} from '@nestjs/common';

import { getCurrentUserId } from '../auth/decorators';
import { CreateRequestPostDto } from './dto/create-request-post.dto';
import { RequestPostService } from './request-post.service';
import { RejectDto } from './dto/reject.dto';

@Controller('request-posts')
export class RequestPostController {
    constructor(private requestPostService: RequestPostService) {}

    @Post('')
    @HttpCode(HttpStatus.OK)
    async create(
        @getCurrentUserId() userId: number,
        @Body() dto: CreateRequestPostDto,
    ) {
        return this.requestPostService.create(userId, dto);
    }

    @Post('approve/:id')
    @HttpCode(HttpStatus.OK)
    async approve(@Param('id') requestPostId: number) {
        return this.requestPostService.approve(requestPostId);
    }

    @Get('')
    @HttpCode(HttpStatus.OK)
    async getPendingPosts() {
        return this.requestPostService.getPendingPosts();
    }

    @Put('reject/:id')
    @HttpCode(HttpStatus.OK)
    async reject(@Param('id') requestPostId: number, @Body() dto: RejectDto) {
        return this.requestPostService.reject(requestPostId, dto);
    }
}
