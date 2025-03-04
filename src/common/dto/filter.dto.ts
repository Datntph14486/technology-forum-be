import { IsInt, Min, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit?: number = 10;

    @IsOptional()
    @IsString()
    search?: string; // Tìm kiếm theo keyword

    @IsOptional()
    @IsString()
    sortBy?: string; // Sắp xếp theo field nào

    @IsOptional()
    @IsString()
    order?: 'ASC' | 'DESC'; // Hướng sắp xếp

    @IsOptional()
    filters?: Record<string, any>; // Chứa các bộ lọc động, ví dụ: { category: 'Electronics', status: 'active' }
}
