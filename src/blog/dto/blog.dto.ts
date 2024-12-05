import { IsNotEmpty, IsString } from "class-validator"

export class blogDTO{
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    description: string
}