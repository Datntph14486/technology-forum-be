import { IsBoolean, IsDate, IsNotEmpty, IsString } from 'class-validator';
import { GENDER } from 'src/common/constants';

export class UpdateUserDto {
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
