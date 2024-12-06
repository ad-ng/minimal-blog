import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { AuthGuard } from '@nestjs/passport';

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
    async addCategory(@Body()dto:any){
        return this.categoryService.createCategory(dto)
    }
}
