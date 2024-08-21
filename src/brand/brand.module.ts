import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Brand, BrandSchema } from 'src/brand/brand.model';

@Module({
  controllers: [BrandController],
  providers: [BrandService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Brand.name,
        schema: BrandSchema
      }
    ])
  ]
})
export class BrandModule { }
