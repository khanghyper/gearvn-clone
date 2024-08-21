import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from 'src/category/category.model';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: CategorySchema
      }
    ]),
    EventEmitterModule.forRoot(),
    CloudinaryModule
  ]
})
export class CategoryModule { }
