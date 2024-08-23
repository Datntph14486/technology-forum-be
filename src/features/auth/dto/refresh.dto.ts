import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RefreshDto {
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsNotEmpty()
    @IsString()
    refreshToken: string;
}
