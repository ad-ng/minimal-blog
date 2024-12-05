import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BlogService {
    constructor(private prisma: PrismaService){}
    async allBlogs(){
        const myBlogs =  await this.prisma.blog.findMany()
        return {
            message: 'blogs found successfully',
            data: myBlogs
        }
    }
}
