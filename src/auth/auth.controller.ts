import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { RegisterDto } from './dto/register.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
    @ApiOperation({
        summary: 'logging in'
    })
    @ApiForbiddenResponse({
        description: 'invalid credentials',
        example: {
            "message": "invalid credentials",
            "error": "Forbidden",
            "statusCode": 403
        }
    })
    @ApiCreatedResponse({
        description: 'correct credentials',
        example: {
            "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjgsImVtYWlsIjoiYWRvbHBoZW5nb2dhQGdtYWlsLmNvbSIsIm5hbWVzIjoiTkdPR0EgQWRvbHBoZSIsImlhdCI6MTczMzQ5Njg1OX0.P0JKtNpzmd5DXuTbE9vgzU4sv1avYzHMSDZ1bZfRJPI"
        }
    })
    @Post('signin')
    async signIn(@Body() dto: AuthDto){
        return this.authService.login(dto)
    }

    @ApiOperation({
        summary: 'registering a user'
    })
    @ApiForbiddenResponse({
        description: 'invalid credentials',
        example: {
            "message": "invalid credentials",
            "error": "Forbidden",
            "statusCode": 403
        }
    })
    @ApiBadRequestResponse({
        description: 'when you you an existing email',
        example: {
            "message": "email already taken",
            "error": "Bad Request",
            "statusCode": 400
        }
    })
    @ApiCreatedResponse({
        description: 'correct credentials',
        example: {
            "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjgsImVtYWlsIjoiYWRvbHBoZW5nb2dhQGdtYWlsLmNvbSIsIm5hbWVzIjoiTkdPR0EgQWRvbHBoZSIsImlhdCI6MTczMzQ5Njg1OX0.P0JKtNpzmd5DXuTbE9vgzU4sv1avYzHMSDZ1bZfRJPI"
        }
    })
    @Post('signup')
    async register(@Body() dto:RegisterDto){
        return this.authService.register(dto)
    }
}
