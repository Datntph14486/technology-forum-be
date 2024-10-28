import { IsString, MaxLength } from 'class-validator';

export class CreateTechnologyDto {
    @IsString()
    @MaxLength(255)
    name: string;

    @IsString()
    @MaxLength(1000)
    description: string;
}
