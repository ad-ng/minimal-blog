import { Body, Controller, Delete, Get,  Put,  Req,  UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UserDto } from './dto/user.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('user/me')
export class UserController {
    constructor(private userService: UserService){}
    
    @ApiOperation({
        summary: 'getting current user'
    })
    @ApiOkResponse({
        description: 'for correct token',
        example: {
            "id": 8,
            "email": "adolphengoga@gmail.com",
            "password": "$argon2id$v=19$m=65536,t=3,p=4$sPFsxRKS3y29kr71/6MBdw$ovk+NjJImgigsC849FNSENRAl+hp77ru/tH4Nnp1/I0",
            "names": "NGOGA Adolphe",
            "phoneNumber": null,
            "role": "USER",
            "created": "2024-12-06T14:54:19.320Z",
            "updated": "2024-12-06T14:54:19.320Z"
        }
    })
    @ApiUnauthorizedResponse({
        description: 'for wrong or no token',
        example: {
            "message": "Unauthorized",
            "statusCode": 401
        }
    })
    @Get()
    async current(@Req() req: Request){
        return await this.userService.getCurrentUser(req.user)
    }

    @ApiOperation({
        summary: 'updating current user'
    })
    @ApiUnauthorizedResponse({
        description: 'for wrong or no token',
        example: {
            "message": "Unauthorized",
            "statusCode": 401
        }
    })
    @ApiBadRequestResponse({
        description: 'ERROR: BAD REQUEST',
        example: {
            "message": [
                "name must be a string",
                "email must be a string",
                "password must be a string",
                "phoneNumber must be a string",
                "role can only be admin or author"
            ],
            "error": "Bad Request",
            "statusCode": 400
        }
    })
    @ApiOkResponse({
        example: {
            "message": "data updated successfully",
            "data": {
                "email": "adolphengoga@gmail.com",
                "password": "$argon2id$v=19$m=65536,t=3,p=4$AwuKax0YkhjX9KeGN64HQg$5ZuIa2AICoXXFLcQ5K3XJqn8QhwF9YBeRZoIfcEX5HU",
                "names": "NGOGA Adolphe",
                "phoneNumber": "+250789988998",
                "role": "USER",
                "created": "2024-12-06T14:54:19.320Z",
                "updated": "2024-12-06T15:29:06.656Z"
            }
        }
    })
    @Put()
    async updateUser(@Body() dto:UserDto,@Req() req: Request){
        return this.userService.updateMe(req.user, dto)
    }

    @ApiOperation({
        summary: 'delete current user'
    })
    @ApiUnauthorizedResponse({
        description: 'for wrong or no token',
        example: {
            "message": "Unauthorized",
            "statusCode": 401
        }
    })
    @ApiOkResponse({
        example: {
            "message": "user deleted successfully"
        }
    })
    @Delete()
    async deleteUser(@Req() req: Request){
        return this.userService.deleteMe(req.user)
    }
}
