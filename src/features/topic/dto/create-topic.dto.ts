import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Entity } from 'typeorm';

@Entity()
export class CreateTopicDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    name: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(1000)
    description: string;
}
