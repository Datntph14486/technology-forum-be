import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { getCurrentUserId } from '../auth/decorators';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('')
    @UseInterceptors(FileInterceptor('file'))
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Body() createUserDto: CreateUserDto,
        @UploadedFile() file: Express.Multer.File,
    ) {
        return this.userService.create(file, createUserDto);
    }

    @Get('')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async find() {
        return this.userService.find();
    }

    @Put('')
    @HttpCode(HttpStatus.OK)
    async update(
        @getCurrentUserId() userId: number,
        @Body() dto: UpdateUserDto,
    ): Promise<any> {
        return this.userService.update(userId, dto);
    }

    @Put('block/:id')
    @HttpCode(HttpStatus.OK)
    async block(@Param('id') userId: number): Promise<any> {
        return this.userService.block(userId);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.OK)
    async delete(@Param('id') userId: number): Promise<any> {
        return this.userService.delete(userId);
    }
}
