import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Entity } from 'typeorm';

@Entity()
export class CreateRequestQuestionDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    title: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(1000)
    content: string;

    @IsString()
    tags: string;
}
