import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from 'src/common/constants';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/roles.guard';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Post('')
    @HttpCode(HttpStatus.OK)
    async create(@Body() dto: CreatePostDto) {
        return this.postService.create(dto);
    }

    @Get('find-by-id/:id')
    async findById(@Param('id') postId: number) {
        return this.postService.findById(postId);
    }

    @Get('')
    async getAll() {
        return this.postService.getAll();
    }
}
