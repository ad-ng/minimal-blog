import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsOptional, Min } from "class-validator";

export class BlogQueryDto {
    @ApiProperty()
    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(()=>Number)
    page: number;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(()=>Number)
    limit : number;
}