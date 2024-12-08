import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'NGOGA Adolphe' })
  @IsString()
  @IsNotEmpty()
  names: string;

  @ApiProperty({ example: 'adolphengoga@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'test123' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
