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
    async addBlog(current,dto){
        const myBlog = await this.prisma.blog.create({
            data: {
                title: dto.title,
                description: dto.description,
                userId: current.sub
            }
        })
        delete myBlog.id
        return {
            message: 'data has been saved',
            data: myBlog
        }
    }
}
