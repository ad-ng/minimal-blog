import { Controller, Get, Patch } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}
    @Get('me')
    async current(){
        return await this.userService.getCurrentUser(5)
    }

}
