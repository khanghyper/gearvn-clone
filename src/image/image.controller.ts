import { BadRequestException, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ImageService } from './image.service';
import { Public } from 'src/auth/auth.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) { }

  @Public()
  @Post('image/upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException();
    return this.imageService.uploadImage(file)
  }

  @Public()
  @Post('upload/editor')
  @UseInterceptors(FileInterceptor('image'))
  uploadCkeditor(@UploadedFile() file: Express.Multer.File) {
    return this.imageService.uploadImageInEditor(file)
  }
}
