import { Injectable, NotFoundException } from '@nestjs/common';
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

    async oneBlog(id){
        const myBlog: object = await this.prisma.blog.findUnique({
            where: { id }
        })
        if(!myBlog){
            return new NotFoundException(`no blog with id: ${id} found`).getResponse()
        }
        return {
            message: 'blog found successfully',
            data: myBlog
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

    async updateBlog(id, dto){
        const myBlog = await this.prisma.blog.update({
            where: { id },
            data: {
                title: dto.title,
                description: dto.description
            }
        })
        delete myBlog.id
        return {
            message: `data updated successfully`,
            data: myBlog
        }
    }

    async deleteOne(id){
        const myBlog = await this.prisma.blog.delete({
            where: { id }
        })
        return {
            message: `blog with id: ${id} deleted successfully`
        }
    }
}
