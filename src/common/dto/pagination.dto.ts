import { Type } from "class-transformer";
import { IsInt, IsOptional, Max, Min } from "class-validator";

export class PaginationDto {
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(50)
    @Type(() => Number) // transforms the param type
    limit: number;
    
    @IsOptional()
    @IsInt()
    @Min(0)
    @Type(() => Number) // transforms the param type
    offset: number;
}