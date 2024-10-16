import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from './file.entity';
import { Repository } from 'typeorm';
import { CreateFileDto } from './dto/create-file.dto';

@Injectable()
export class FileService {
    constructor(
        @InjectRepository(FileEntity)
        private readonly fileRepository: Repository<FileEntity>,
    ) {}

    async create(createFileDto: CreateFileDto) {
        const file = await this.fileRepository.create({
            name: createFileDto?.name,
            width: createFileDto?.width,
            height: createFileDto?.height,
            mime: createFileDto?.mime,
            size: createFileDto?.size,
            url: createFileDto?.url,
        });

        const newFile = await this.fileRepository.save(file);

        return newFile;
    }
}
