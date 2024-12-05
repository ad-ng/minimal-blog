import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { BlogService } from './blog.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('blog')
export class BlogController {
    constructor(private blogService: BlogService){}
    @Get()
    async getAllBlogs(){
        return this.blogService.allBlogs()
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async createBlog(@Body() dto:any, @Req() req: Request){
        return this.blogService.addBlog(req.user, dto)
    }
}
