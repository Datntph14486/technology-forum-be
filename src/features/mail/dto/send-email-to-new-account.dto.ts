import { IsString } from 'class-validator';

export class SendEmailToNewAccountDto {
    @IsString()
    email: string;

    @IsString()
    name: string;

    @IsString()
    password: string;
}
