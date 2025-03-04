import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
import { Entity } from 'typeorm';

@Entity()
export class CreateDeviceTokenDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    deviceType: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(1000)
    deviceName: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(1000)
    deviceToken: string;

    @IsNumber()
    @IsNotEmpty()
    targetId: number;
}
