import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Param,
    Post,
} from '@nestjs/common';

import { getCurrentUserId } from '../auth/decorators';
import { CreateRequestPostDto } from './dto/create-request-post.dto';
import { RequestPostService } from './request-post.service';

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
}
