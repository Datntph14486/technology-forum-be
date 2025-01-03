import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import xss from 'xss';

export class AuthSignInDto {
    @IsNotEmpty()
    @IsString()
    @Length(4, 20)
    @Transform(({ value }) => xss(value.trim()))
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(4, 20)
    @Transform(({ value }) => xss(value.trim()))
    password: string;
}
