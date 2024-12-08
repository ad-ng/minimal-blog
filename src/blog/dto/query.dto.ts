import { Type } from "class-transformer";
import { IsInt, IsOptional } from "class-validator";

export class BlogQueryDto {
    @IsOptional()
    @IsInt()
    @Type(()=>Number)
    page: number;

    @IsOptional()
    @IsInt()
    @Type(()=>Number)
    limit : number;
}