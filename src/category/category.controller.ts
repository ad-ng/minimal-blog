import { Controller, Get, Param } from '@nestjs/common';
import { CategoryService } from './category.service';

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
}
