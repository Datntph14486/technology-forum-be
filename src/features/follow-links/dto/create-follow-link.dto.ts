import { IsNotEmpty, IsNumber } from 'class-validator';
import { Entity } from 'typeorm';

@Entity()
export class CreateFollowLinkDto {
    @IsNotEmpty()
    @IsNumber()
    userId: number;
}
