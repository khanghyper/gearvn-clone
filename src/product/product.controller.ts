import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Public } from 'src/auth/auth.decorator';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ProductDto, ProductQueryDto } from 'src/product/product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  // @Public()
  // @Post('test-post')
  // @UseInterceptors(FilesInterceptor('imgs'))
  // // async createProduct(@UploadedFiles() files: Express.Multer.File[], @Body() body: ProductDto) {
  // async createProduct(@UploadedFiles() files: Express.Multer.File[], @Body() body: ProductDto) {
  //   if(!files || !files.length) {
  //     return {
  //       message: 'Images should not be empty!',
  //       error: 'Bad request',
  //       statusCode: 400
  //     }
  //   }

  //   // let imgs = [];

  //   // for(let file of files) {
  //   //   let response = await this.cloudinaryService.uploadFile(file);
  //   //   imgs.push({
  //   //     public_id: response.public_id,
  //   //     url: response.url,
  //   //     originalname: file.originalname
  //   //   })
  //   // }
  //   // console.log(imgs);
  //   console.log(body);

  //   return {a: 1}
  // }

  // @Public()
  @Get()
  getListProduct() {
    return this.productService.getList();
  }

  // @Public()
  @Post('product')
  createProduct(@Body() payload: any) {
    return this.productService.create(payload);
  }
}
