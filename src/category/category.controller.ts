import { Body, Controller, Get, Param, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Public } from 'src/auth/auth.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { Types } from 'mongoose';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Public()
  @Get('')
  async findAll(@Query() query: { parentId?: string }) {
    return this.categoryService.findAll(query);
  }

  @Public()
  @Get('v1')
  async findAllV1() {
    return this.categoryService.findv1();
  }

  @Public()
  @Get('category/:id')
  async findById(@Param('id') id: string) {
    return this.categoryService.findById(id);
  }


  @Public()
  @Post('category')
  @UseInterceptors(FileInterceptor('image'))
  async createCategory(@Body() body: any, @UploadedFile() file: Express.Multer.File) {
    return this.categoryService.createCategory(body, file);
  }
}
