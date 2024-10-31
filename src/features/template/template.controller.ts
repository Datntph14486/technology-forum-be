import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TEMPLATE_TYPE } from './constants';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { TemplateService } from './template.service';
import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common';
import { RoleGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from 'src/common/constants';

@ApiTags('templates')
@ApiBearerAuth()
@Controller('templates')
export class TemplateController {
    constructor(private templateService: TemplateService) {}
    @Get('find-by-type')
    async findByType(@Query('type') type: TEMPLATE_TYPE) {
        return this.templateService.findByType(type);
    }
    @Post('')
    @HttpCode(HttpStatus.OK)
    async create(dto: CreateTemplateDto) {
        return this.templateService.create(dto);
    }

    @Put('/:id')
    @HttpCode(HttpStatus.OK)
    async update(@Param('id') templateId: number, dto: UpdateTemplateDto) {
        return this.templateService.update(templateId, dto);
    }
}
