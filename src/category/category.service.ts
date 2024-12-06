import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService){}

    async allCategories():Promise<object>{
        const cat: object[] = await this.prisma.category.findMany()
        return {
            message: 'categories found successfully',
            data: cat
        }
    }

    async oneCategory(id):Promise<object>{
        const cat: object= await this.prisma.category.findUnique({
            where: { id }
        })
        if(!cat){
            throw new NotFoundException(`no category with id: ${id} found`).getResponse()
        }
        return {
            message: 'category found',
            data: cat
        }
    }
}
