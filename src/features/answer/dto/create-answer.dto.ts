import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
import { Entity } from 'typeorm';

@Entity()
export class CreateAnswerDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(1000)
    content: string;

    @IsNumber()
    @IsNotEmpty()
    createById: number;

    @IsNumber()
    @IsNotEmpty()
    questionId: number;
}
