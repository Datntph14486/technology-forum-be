import {
    Controller,
    HttpCode,
    Post,
    HttpStatus,
    Body,
    UseGuards,
    Get,
    Param,
    Delete,
} from '@nestjs/common';
import { DiscussService } from './discuss.service';
import { CreateDiscussDto } from './dto/create.discuss.dto';
import { getCurrentUserId } from '../auth/decorators';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from 'src/common/constants';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/roles.guard';

@Controller('discuss')
export class DiscussController {
    constructor(private readonly discussService: DiscussService) {}

    @Post('')
    @Roles([Role.CUSTOMER, Role.ADMIN])
    @UseGuards(JwtAuthGuard, RoleGuard)
    @HttpCode(HttpStatus.OK)
    async create(
        @getCurrentUserId() userId: number,
        @Body() dto: CreateDiscussDto,
    ) {
        return this.discussService.create(userId, dto);
    }

    @Get('get-by-post-id/:id')
    async getDiscussByPostId(@Param('id') id: number) {
        return this.discussService.getDiscussByPostId(id);
    }

    @Get('get-by-parent-id/:id')
    async getDisCussByParentId(@Param('id') id: number) {
        return this.discussService.getDisCussByParentId(id);
    }

    @Delete('/:id')
    async deleteBydId(
        @getCurrentUserId() userId: number,
        @Param('id') id: number,
    ) {
        return this.discussService.deleteBydId(userId, id);
    }
}
