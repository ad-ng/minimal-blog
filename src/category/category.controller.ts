import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { AuthGuard } from '@nestjs/passport';
import { categoryDTO } from './dto/category.dto';

@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoryService){}

    @Get()
    async GetAllCategories(){
        return this.categoryService.allCategories()
    }

    @Get(':id')
    async GetOneCategory(@Param('id') id: string){
        return this.categoryService.oneCategory(parseInt(id))
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async addCategory(@Body()dto:categoryDTO){
        return this.categoryService.createCategory(dto)
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async updateCategory(@Body() dto:categoryDTO, @Param('id') id:string){
        return this.categoryService.updateOne(parseInt(id),dto)
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async deleteCategory(@Param('id') id:string){
        return this.categoryService.deleteOne(parseInt(id,10))
    }
}
