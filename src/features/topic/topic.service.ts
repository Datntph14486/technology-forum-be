import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TopicEntity } from './topic.entity';
import { Repository } from 'typeorm';
import { CreateTopicDto } from './dto/create-topic.dto';
import { COMMON_MESSAGE, NOT_FOUND_ERROR } from 'src/common/constants';

@Injectable()
export class TopicService {
    constructor(
        @InjectRepository(TopicEntity)
        private readonly topicRepository: Repository<TopicEntity>,
    ) {}

    async create(dto: CreateTopicDto) {
        const oldTopic = await this.topicRepository.findOne({
            where: {
                name: dto.name,
            },
        });

        if (oldTopic) {
            throw new ConflictException(COMMON_MESSAGE.NAME_ALREADY_EXISTS);
        }

        const newTopic = await this.topicRepository.create({
            name: dto.name,
            description: dto.description,
        });

        const saveTopic = await this.topicRepository.save(newTopic);

        return saveTopic;
    }

    async findById(id: number) {
        const topic = await this.topicRepository.findOne({
            where: {
                id,
            },
        });

        if (!topic) {
            throw new NotFoundException(NOT_FOUND_ERROR.TOPIC);
        }

        return topic;
    }
}
