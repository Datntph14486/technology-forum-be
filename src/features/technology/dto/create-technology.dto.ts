import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTechnologyDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    name: string;

    @IsString()
    @MaxLength(1000)
    @IsNotEmpty()
    description: string;
}
