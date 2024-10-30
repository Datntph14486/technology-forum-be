import {
    IsBoolean,
    IsDate,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';
import { GENDER } from 'src/common/constants';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    firstName?: string;

    @IsOptional()
    @IsString()
    lastName?: string;

    @IsOptional()
    @IsString()
    gender?: GENDER;

    @IsOptional()
    @IsDate()
    dateOfBirth?: Date;

    @IsOptional()
    @IsBoolean()
    phone?: string;

    @IsOptional()
    @IsBoolean()
    country?: string;

    @IsOptional()
    @IsBoolean()
    city?: string;

    @IsOptional()
    @IsBoolean()
    district?: string;

    @IsOptional()
    @IsBoolean()
    fullAddress?: string;

    @IsOptional()
    @IsNumber()
    totalUnreadNotification: number;
}
