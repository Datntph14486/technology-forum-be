import { IsString } from 'class-validator';

export class ResetPasswordDto {
    @IsString()
    password: string;

    @IsString()
    passwordConfirmation: string;

    @IsString()
    token: string;
}
