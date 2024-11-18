import { IsEnum, IsString } from "class-validator"

enum Roles{
    ADMIN = 'admin',
    USER = 'user',
}

export class UserDto{
    @IsString()
    name: string

    @IsString()
    email: string

    @IsString()
    password: string

    @IsString()
    phoneNumber: string

    @IsEnum(Roles, { message: 'role can only be admin or author'})
    role: Roles
}
