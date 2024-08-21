import { Module } from '@nestjs/common';
import { CloudinaryProvider } from 'src/cloudinary/cloudinary.provider';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  providers: [CloudinaryService, CloudinaryProvider],
  exports: [CloudinaryService, CloudinaryProvider],
})
export class CloudinaryModule {}
