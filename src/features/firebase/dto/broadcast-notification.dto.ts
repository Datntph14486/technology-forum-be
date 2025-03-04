import { IsArray, IsOptional, IsString } from 'class-validator';

export class BroadCastNotificationDto {
    @IsArray()
    customer_ids: number[];

    @IsString()
    title: string;

    @IsString()
    type: string;

    @IsOptional()
    body: any;

    @IsOptional()
    data: any = null;
}
