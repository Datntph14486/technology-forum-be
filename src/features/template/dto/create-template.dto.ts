import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Entity } from 'typeorm';
import { TEMPLATE_TYPE } from '../constants';

@Entity()
export class CreateTemplateDto {
    @IsNotEmpty()
    @IsString()
    @IsEnum(TEMPLATE_TYPE)
    type: TEMPLATE_TYPE;

    @IsString()
    to: string;

    @IsString()
    cc: string;

    @IsString()
    @IsNotEmpty()
    subject: string;

    @IsNotEmpty()
    @IsString()
    body: string;
}
