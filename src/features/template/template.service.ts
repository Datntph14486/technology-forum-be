import {
    ConflictException,
    Injectable,
    NotFoundException,
    Query,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TemplateEntity } from './template.entity';
import { Repository } from 'typeorm';
import { TEMPLATE_TYPE } from './constants';
import { COMMON_MESSAGE, NOT_FOUND_ERROR } from 'src/common/constants';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';

@Injectable()
export class TemplateService {
    constructor(
        @InjectRepository(TemplateEntity)
        private readonly templateRepository: Repository<TemplateEntity>,
    ) {}

    async findByType(type: TEMPLATE_TYPE) {
        const template = await this.templateRepository.findOne({
            where: {
                type,
            },
        });

        if (!template) {
            throw new NotFoundException(NOT_FOUND_ERROR.TEMPLATE);
        }

        return template;
    }

    async create(dto: CreateTemplateDto) {
        const template = await this.templateRepository.findOne({
            where: {
                type: dto.type,
            },
        });

        if (template) {
            throw new ConflictException(COMMON_MESSAGE.TEMPLATE_TYPE);
        }

        const newTemplate = await this.templateRepository.create({
            type: dto.type,
            to: dto?.to,
            cc: dto?.cc,
            body: dto.body,
            subject: dto.subject,
        });

        const saveTemplate = await this.templateRepository.save(newTemplate);

        return saveTemplate;
    }

    async update(templateId: number, dto: UpdateTemplateDto) {
        const template = await this.templateRepository.findOne({
            where: {
                id: templateId,
            },
        });

        if (!template) {
            throw new NotFoundException(NOT_FOUND_ERROR.TEMPLATE);
        }

        const newTemplate = await this.templateRepository.update(
            { id: templateId },
            {
                ...dto,
            },
        );

        return newTemplate;
    }
}
