import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { TechnologyService } from './technology.service';
import { CreateTechnologyDto } from './dto/create-technology.dto';

@Controller('')
export class TechnologyController {
    constructor(private technologyService: TechnologyService) {}

    @Post('')
    @HttpCode(HttpStatus.CREATED)
    async create(file: Express.Multer.File, dto: CreateTechnologyDto) {
        return this.technologyService.create(file, dto);
    }
}
