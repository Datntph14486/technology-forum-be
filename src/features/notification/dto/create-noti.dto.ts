import {
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsString,
    MaxLength,
} from 'class-validator';
import { Entity } from 'typeorm';
import { NOTIFICATION_TYPE } from '../constants';

@Entity()
export class CreateNotificationDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    title: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(1000)
    body: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(1000)
    data: string;

    @IsEnum(NOTIFICATION_TYPE)
    @IsNotEmpty()
    type: NOTIFICATION_TYPE;

    @IsNumber()
    @IsNotEmpty()
    targetId: number;
}
