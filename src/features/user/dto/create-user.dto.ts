import { IsBoolean, IsDate, IsNotEmpty, IsString } from 'class-validator';
import { GENDER } from 'src/common/constants';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsString()
    username?: string;

    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsString()
    gender?: GENDER;

    @IsDate()
    dateOfBirth?: Date;

    @IsString()
    password?: string;

    @IsBoolean()
    verfify?: boolean;

    @IsString()
    hashedRT?: string;

    @IsBoolean()
    blocked?: boolean;

    @IsBoolean()
    phone?: string;

    @IsBoolean()
    country?: string;

    @IsBoolean()
    city?: string;

    @IsBoolean()
    district?: string;

    @IsBoolean()
    fullAddress?: string;
}
