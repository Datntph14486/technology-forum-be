import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRequestPostDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    content?: string;

    @IsString()
    tags: string;

    @IsNumber()
    topicId: number;
}
