import { Body, Controller, Get, Post } from '@nestjs/common';
import { BrandService } from './brand.service';
import { Public } from 'src/auth/auth.decorator';

@Controller('brands')
export class BrandController {
  constructor(private readonly brandService: BrandService) { }

  @Public()
  @Get('')
  async findAll() {
    return this.brandService.findAll();
  }

  @Public()
  @Post('brand')
  async create(@Body() payload: any) {
    return this.brandService.create(payload);
  }
}
