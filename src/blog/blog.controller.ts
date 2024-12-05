import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { BlogService } from './blog.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { blogDTO } from './dto';

@Controller('blog')
export class BlogController {
    constructor(private blogService: BlogService){}
    @Get()
    async getAllBlogs(){
        return this.blogService.allBlogs()
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async createBlog(@Body() dto:blogDTO, @Req() req: Request){
        return this.blogService.addBlog(req.user, dto)
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async updating(@Body() dto:blogDTO, @Param('id') id: string ){
        return this.blogService.updateBlog(parseInt(id),dto)
    }
}
