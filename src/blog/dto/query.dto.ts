import { Type } from "class-transformer";
import { IsInt, IsOptional, Min } from "class-validator";

export class BlogQueryDto {
    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(()=>Number)
    page: number;

    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(()=>Number)
    limit : number;
}