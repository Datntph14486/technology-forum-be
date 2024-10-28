import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TEMPLATE_TYPE } from './constants';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { TemplateService } from './template.service';
import { Controller, Get, Param, Post, Put, Query } from '@nestjs/common';

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
    async create(dto: CreateTemplateDto) {
        return this.templateService.create(dto);
    }

    @Put('/:id')
    async update(@Param('id') templateId: number, dto: UpdateTemplateDto) {
        return this.templateService.update(templateId, dto);
    }
}
