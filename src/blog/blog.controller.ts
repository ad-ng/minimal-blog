import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { blogDTO, BlogQueryDto } from './dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}
  @Get()
  @ApiOperation({
    summary: 'endpoint to get all blogs',
  })
  @ApiOkResponse({
    example: {
      message: 'blogs found successfully',
      data: [],
    },
  })
  async getAllBlogs(@Query() query: BlogQueryDto) {
    return this.blogService.allBlogs(query);
  }

  @ApiOperation({
    summary: 'getting an individual blog',
  })
  @ApiOkResponse({
    example: {
      message: 'data has been saved',
      data: {
        title: 'test title ',
        description: 'test description ',
        userId: 1,
        categoryId: null,
        created: '2024-12-06T08:13:57.839Z',
        updated: '2024-12-06T08:13:57.839Z',
      },
    },
  })
  @ApiNotFoundResponse({
    example: {
      message: `no blog with id: 2 found`,
      error: 'Not Found',
      statusCode: 404,
    },
  })
  @Get(':id')
  async getOneBlog(@Param('id') id: string) {
    return this.blogService.oneBlog(parseInt(id));
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'adding a blog',
  })
  @ApiUnauthorizedResponse({
    example: {
      message: 'Unauthorized',
      statusCode: 401,
    },
  })
  @ApiCreatedResponse({
    type: blogDTO,
    example: {
      message: 'data has been saved',
      data: {
        title: 'test title ',
        description: 'test description ',
        userId: 1,
        categoryId: null,
        created: '2024-12-06T13:49:42.616Z',
        updated: '2024-12-06T13:49:42.616Z',
      },
    },
  })
  @ApiBadRequestResponse({
    example: {
      message: [
        'title should not be empty',
        'title must be a string',
        'description should not be empty',
        'description must be a string',
      ],
      error: 'Bad Request',
      statusCode: 400,
    },
  })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createBlog(@Body() dto: blogDTO, @Req() req: Request) {
    return this.blogService.addBlog(req.user, dto);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'updating a blog',
  })
  @ApiUnauthorizedResponse({
    example: {
      message: 'Unauthorized',
      statusCode: 401,
    },
  })
  @ApiBadRequestResponse({
    example: {
      message: [
        'title should not be empty',
        'title must be a string',
        'description should not be empty',
        'description must be a string',
      ],
      error: 'Bad Request',
      statusCode: 400,
    },
  })
  @ApiNotFoundResponse({
    example: {
      message: `no blog with id: 2 found`,
      error: 'Not Found',
      statusCode: 404,
    },
  })
  @ApiOkResponse({
    example: {
      message: 'data updated successfully',
      data: {
        title: 'test title !!',
        description: 'test description ',
        userId: 1,
        categoryId: null,
        created: '2024-12-06T13:49:42.616Z',
        updated: '2024-12-06T14:21:32.425Z',
      },
    },
  })
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async updating(@Body() dto: blogDTO, @Param('id') id: string) {
    return this.blogService.updateBlog(parseInt(id), dto);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'deleting a blog',
  })
  @ApiNotFoundResponse({
    example: {
      message: `no blog with id: 2 found`,
      error: 'Not Found',
      statusCode: 404,
    },
  })
  @ApiUnauthorizedResponse({
    example: {
      message: 'Unauthorized',
      statusCode: 401,
    },
  })
  @ApiOkResponse({
    example: {
      message: 'blog with id: deleted successfully',
    },
  })
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteBlog(@Param('id') id: string) {
    return this.blogService.deleteOne(parseInt(id));
  }
}
