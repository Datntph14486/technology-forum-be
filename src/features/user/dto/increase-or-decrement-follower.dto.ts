import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { Entity } from 'typeorm';
import { INCREASE_OR_DECREMENT } from '../interface';

@Entity()
export class increaseOrDecrementDto {
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsNumber()
    @IsNotEmpty()
    target: number;

    @IsNotEmpty()
    @IsEnum(INCREASE_OR_DECREMENT)
    type: INCREASE_OR_DECREMENT;
}
