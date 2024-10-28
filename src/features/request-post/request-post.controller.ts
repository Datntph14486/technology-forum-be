import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';

import { getCurrentUserId } from '../auth/decorators';
import { CreateRequestPostDto } from './dto/create-request-post.dto';
import { RequestPostService } from './request-post.service';
import { RejectDto } from './dto/reject.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from 'src/common/constants';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/roles.guard';

@Controller('request-posts')
export class RequestPostController {
    constructor(private requestPostService: RequestPostService) {}

    @Post('')
    @Roles([Role.CUSTOMER, Role.ADMIN])
    @UseGuards(JwtAuthGuard, RoleGuard)
    @HttpCode(HttpStatus.OK)
    async create(
        @getCurrentUserId() userId: number,
        @Body() dto: CreateRequestPostDto,
    ) {
        return this.requestPostService.create(userId, dto);
    }

    @Post('approve/:id')
    @Roles([Role.ADMIN])
    @UseGuards(JwtAuthGuard, RoleGuard)
    @HttpCode(HttpStatus.OK)
    async approve(@Param('id') requestPostId: number) {
        return this.requestPostService.approve(requestPostId);
    }

    @Get('')
    @Roles([Role.ADMIN])
    @UseGuards(JwtAuthGuard, RoleGuard)
    @HttpCode(HttpStatus.OK)
    async getPendingPosts() {
        return this.requestPostService.getPendingPosts();
    }

    @Put('reject/:id')
    @Roles([Role.ADMIN])
    @UseGuards(JwtAuthGuard, RoleGuard)
    @HttpCode(HttpStatus.OK)
    async reject(@Param('id') requestPostId: number, @Body() dto: RejectDto) {
        return this.requestPostService.reject(requestPostId, dto);
    }
}
