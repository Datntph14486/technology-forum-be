import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplateEntity } from './template.entity';
import { TemplateController } from './template.controller';
import { TemplateService } from './template.service';

@Module({
    imports: [TypeOrmModule.forFeature([TemplateEntity])],
    controllers: [TemplateController],
    providers: [TemplateService],
    exports: [TemplateService],
})
export class TemplateModule {}
