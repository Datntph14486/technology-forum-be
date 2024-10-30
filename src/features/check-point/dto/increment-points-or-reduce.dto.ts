import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { Entity } from 'typeorm';
import { RELATED_TYPE } from '../constants';

@Entity()
export class IncrementOrReducePointsDto {
    @IsNumber()
    @IsNotEmpty()
    relatedId: number;

    @IsEnum(RELATED_TYPE)
    @IsNotEmpty()
    relatedType: RELATED_TYPE;
}
