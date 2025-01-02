import { IsNumber, IsOptional, IsString } from 'class-validator';

export class TestQueueDto {
    @IsOptional()
    body: any;
}
