import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Entity } from 'typeorm';

@Entity()
export class RejectRequestPostDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(1000)
    feedback: string;
}
