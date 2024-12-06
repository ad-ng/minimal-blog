import { IsNotEmpty, IsString } from "class-validator";

export class categoryDTO{
    @IsString()
    @IsNotEmpty()
    name: string
}