import { Injectable, NotFoundException } from '@nestjs/common';
import { take } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async allCategories(query): Promise<object> {
    const page = query.page || 1
    const limit = query.limit || 10
    const cat: object[] = await this.prisma.category.findMany({
      orderBy: [{ id: 'desc' }],
      take: limit,
      skip: ((page - 1) * limit)
    })
    return {
      message: 'categories found successfully',
      data: cat,
    };
  }

  async oneCategory(id): Promise<object> {
    const cat: object = await this.prisma.category.findUnique({
      where: { id },
    });
    if (!cat) {
      throw new NotFoundException(
        `no category with id: ${id} found`,
      ).getResponse();
    }
    return {
      message: 'category found',
      data: cat,
    };
  }

  async createCategory(dto): Promise<object> {
    const category: object = await this.prisma.category.create({
      data: {
        name: dto.name,
      },
    });
    return {
      message: 'category created successfully',
      data: category,
    };
  }

  async updateOne(id, dto): Promise<object> {
    const checkCat = await this.prisma.category.findUnique({
      where: { id },
    });
    if (!checkCat)
      throw new NotFoundException(
        `no category with id:${id} found !`,
      ).getResponse();
    const category: object = await this.prisma.category.update({
      where: { id },
      data: {
        name: dto.name,
      },
    });
    return {
      message: 'category updated successfully',
      data: category,
    };
  }

  async deleteOne(id): Promise<object> {
    const checkCat = await this.prisma.category.findUnique({
      where: { id },
    });
    if (!checkCat)
      throw new NotFoundException(
        `no category with id:${id} found !`,
      ).getResponse();
    const category: object = await this.prisma.category.delete({
      where: { id },
    });
    return {
      message: `category with id:${id} deleted successfully`,
    };
  }
}
