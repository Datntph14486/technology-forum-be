import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class SendNotificationDto {
    @IsNumber()
    customer_id: number;

    @IsString()
    title: string;

    @IsString()
    type: string;

    @IsOptional()
    body: any;

    @IsOptional()
    data: any = null;

    @IsString()
    imageUrl: string;
}
