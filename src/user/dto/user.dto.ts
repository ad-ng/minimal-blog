import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsString } from "class-validator"

enum Roles{
    ADMIN = 'admin',
    USER = 'user',
}

export class UserDto{
    @ApiProperty({ example: 'NGOGA Adolphe' })
    @IsString()
    name: string

    @ApiProperty({ example: 'adolphengoga@gmail.com'})
    @IsString()
    email: string

    @ApiProperty({ example: 'test123'})
    @IsString()
    password: string

    @ApiProperty({ example: '+250789988998'})
    @IsString()
    phoneNumber: string

    @ApiProperty({ enum: ['admin', 'author']})
    @IsEnum(Roles, { message: 'role can only be admin or author'})
    role: Roles
}
