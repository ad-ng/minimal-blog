import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class categoryDTO{
    @ApiProperty({ example: 'top 10s'})
    @IsString()
    @IsNotEmpty()
    name: string
}