import { IsInt, IsNumber, IsString, MaxLength, Min } from 'class-validator';
import { Entity } from 'typeorm';

@Entity()
export class CreatePostDto {
    @IsString()
    @MaxLength(255)
    title: string;

    @IsString()
    @MaxLength(255)
    content: string;

    @IsString()
    @MaxLength(255)
    tags: string;

    @IsNumber()
    technologyId: number;

    @IsNumber()
    topicId: number;

    @IsNumber()
    userId: number;
}
