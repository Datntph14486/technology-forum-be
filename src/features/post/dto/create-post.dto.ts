import {
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsString,
    MaxLength,
    Min,
} from 'class-validator';
import { Entity } from 'typeorm';

@Entity()
export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    title: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    content: string;

    @IsString()
    @MaxLength(255)
    tags: string;

    @IsNotEmpty()
    @IsNumber()
    technologyId: number;
    @IsNotEmpty()
    @IsNumber()
    topicId: number;

    @IsNotEmpty()
    @IsNumber()
    userId: number;
}
