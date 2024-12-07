import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { AuthGuard } from '@nestjs/passport';
import { categoryDTO } from './dto/category.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoryService){}

    @ApiOperation({
        summary: 'get all categories'
    })
    @ApiOkResponse({
        example: {
            "message": "categories found successfully",
            "data": []
        }
    })
    @Get()
    async GetAllCategories(){
        return this.categoryService.allCategories()
    }

    @ApiOperation({
        summary: 'get category by id'
    })
    @ApiNotFoundResponse({
        example: {
            "statusCode": 404,
            "message": "no category with id: 20 found"
        }
    })
    @ApiOkResponse({
        example: {
            "message": "category found",
            "data": {
                "id": 3,
                "name": "hot takes",
                "createdAt": "2024-12-12T00:00:00.000Z",
                "updatedAt": "2024-12-12T00:00:00.000Z"
            }
        }
    })
    @Get(':id')
    async GetOneCategory(@Param('id') id: string){
        return this.categoryService.oneCategory(parseInt(id))
    }

    @ApiBearerAuth()
    @ApiOperation({
        summary: 'adding a category'
    })
    @ApiUnauthorizedResponse({
        example: {
            "message": "Unauthorized",
            "statusCode": 401
        }
    })
    @ApiBadRequestResponse({
        example: {
            "message": [
                "name should not be empty",
                "name must be a string"
            ],
            "error": "Bad Request",
            "statusCode": 400
        }
    })
    @ApiCreatedResponse({
        example: {
            "message": "category created successfully",
            "data": {
                "id": 4,
                "name": "top 10s",
                "createdAt": "2024-12-07T15:36:40.323Z",
                "updatedAt": "2024-12-07T15:36:40.323Z"
            }
        }
    })
    @UseGuards(AuthGuard('jwt'))
    @Post()
    async addCategory(@Body()dto:categoryDTO){
        return this.categoryService.createCategory(dto)
    }

    @ApiBearerAuth()
    @ApiOperation({
        summary: 'updating a category'
    })
    @ApiUnauthorizedResponse({
        example: {
            "message": "Unauthorized",
            "statusCode": 401
        }
    })
    @ApiBadRequestResponse({
        example: {
            "message": [
                "name should not be empty",
                "name must be a string"
            ],
            "error": "Bad Request",
            "statusCode": 400
        }
    })
    @ApiOkResponse({
        example: {
            "message": "category updated successfully",
            "data": {
                "id": 4,
                "name": "top 10",
                "createdAt": "2024-12-07T15:36:40.323Z",
                "updatedAt": "2024-12-07T15:46:01.464Z"
            }
        }
    })
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
