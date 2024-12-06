import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService){}

    async allCategories(){
        const cat: object[] = await this.prisma.category.findMany()
        return {
            message: 'categories found successfully',
            data: cat
        }
    }
}
