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
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from 'src/common/constants';
import { RoleGuard } from '../auth/guards/roles.guard';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('')
    @Roles([Role.CUSTOMER, Role.ADMIN])
    @UseGuards(JwtAuthGuard, RoleGuard)
    @UseInterceptors(FileInterceptor('file'))
    @ApiBody({
        description: 'The data needed to create a new user',
        type: CreateUserDto,
        // Thêm ví dụ cho body request
        examples: {
            default: {
                summary: 'A sample user object',
                value: {
                    username: 'john_doe',
                    email: 'john@example.com',
                    password: 'strongpassword123',
                },
            },
        },
    })
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Body() createUserDto: CreateUserDto,
        @UploadedFile() file: Express.Multer.File,
    ) {
        return this.userService.create(file, createUserDto);
    }

    @Get('')
    @Roles([Role.CUSTOMER, Role.ADMIN])
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiResponse({ status: 200, description: 'Return all users.' })
    @HttpCode(HttpStatus.OK)
    async find() {
        return this.userService.find();
    }

    @Put('')
    @Roles([Role.CUSTOMER, Role.ADMIN])
    @UseGuards(JwtAuthGuard, RoleGuard)
    @HttpCode(HttpStatus.OK)
    async update(
        @getCurrentUserId() userId: number,
        @Body() dto: UpdateUserDto,
    ): Promise<any> {
        return this.userService.update(userId, dto);
    }

    @Put('block/:id')
    @Roles([Role.ADMIN])
    @UseGuards(JwtAuthGuard, RoleGuard)
    @HttpCode(HttpStatus.OK)
    async block(@Param('id') userId: number): Promise<any> {
        return this.userService.block(userId);
    }

    @Delete('/:id')
    @Roles([Role.ADMIN])
    @UseGuards(JwtAuthGuard, RoleGuard)
    @HttpCode(HttpStatus.OK)
    async delete(@Param('id') userId: number): Promise<any> {
        return this.userService.delete(userId);
    }
}
