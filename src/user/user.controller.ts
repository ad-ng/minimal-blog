import { Controller, Get,  Req,  UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    async current(@Req() req: Request){
        return await this.userService.getCurrentUser(req.user)
    }
}
