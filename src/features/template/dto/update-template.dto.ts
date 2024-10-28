import { IsNotEmpty, IsString } from 'class-validator';
import { Entity } from 'typeorm';

@Entity()
export class UpdateTemplateDto {
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
