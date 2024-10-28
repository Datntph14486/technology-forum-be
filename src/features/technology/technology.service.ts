import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TechnologyEntity } from './technology.entity';
import { Repository } from 'typeorm';
import { CreateTechnologyDto } from './dto/create-technology.dto';
import { COMMON_MESSAGE, NOT_FOUND_ERROR } from 'src/common/constants';
import { AwsService } from '../aws/aws.service';

@Injectable()
export class TechnologyService {
    constructor(
        @InjectRepository(TechnologyEntity)
        private readonly technologyRepository: Repository<TechnologyEntity>,

        private readonly awsService: AwsService,
    ) {}

    async create(file: Express.Multer.File, dto: CreateTechnologyDto) {
        const technology = await this.technologyRepository.findOne({
            where: {
                name: dto.name,
            },
        });

        if (technology) {
            throw new ConflictException(COMMON_MESSAGE.NAME_ALREADY_EXISTS);
        }

        const icon = await this.awsService.upload(file);

        const newTechnology = await this.technologyRepository.create({
            name: dto.name,
            description: dto.description,
            icon: icon?.id,
        });

        const saveTechnology =
            await this.technologyRepository.save(newTechnology);

        return saveTechnology;
    }

    async findById(id: number) {
        const technology: TechnologyEntity =
            await this.technologyRepository.findOne({
                where: {
                    id,
                },
            });

        if (!technology) {
            throw new NotFoundException(NOT_FOUND_ERROR.TECHNOLOGY);
        }

        return technology;
    }
}
