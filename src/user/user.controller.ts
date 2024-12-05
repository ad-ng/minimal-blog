import { Body, Controller, Delete, Get,  Put,  Req,  UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UserDto } from './dto/user.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('user/me')
export class UserController {
    constructor(private userService: UserService){}
    
    @Get()
    async current(@Req() req: Request){
        return await this.userService.getCurrentUser(req.user)
    }

    @Put()
    async updateUser(@Body() dto:UserDto,@Req() req: Request){
        return this.userService.updateMe(req.user, dto)
    }

    @Delete()
    async deleteUser(@Req() req: Request){
        return this.userService.deleteMe(req.user)
    }
}
