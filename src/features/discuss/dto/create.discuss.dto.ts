import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
import { Entity } from 'typeorm';

@Entity()
export class CreateDiscussDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(1000)
    content: string;

    @IsNumber()
    @IsNotEmpty()
    postId: number;

    @IsNumber()
    replyToDiscussId?: number;
}
