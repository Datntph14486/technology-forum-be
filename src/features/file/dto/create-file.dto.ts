import { IsNumber, IsString } from 'class-validator';

export class CreateFileDto {
    @IsString()
    name: string;

    @IsNumber()
    width: number;

    @IsNumber()
    height: number;

    @IsString()
    mime: string;

    @IsNumber()
    size: number;

    @IsString()
    url: string;
}
