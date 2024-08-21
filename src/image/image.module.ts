import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Image, ImageSchema } from 'src/image/image.model';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  controllers: [ImageController],
  providers: [ImageService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Image.name,
        schema: ImageSchema
      }
    ]),
    CloudinaryModule
  ]
})
export class ImageModule { }
