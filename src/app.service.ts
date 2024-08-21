import { Body, Injectable, UploadedFile } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class AppService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  getFileByFilename(filename: string, res: Response) {
    const filePath = join(process.cwd(), 'public', filename);
    return res.sendFile(filePath);
  }

  async testCreate(@UploadedFile() file: Express.Multer.File, @Body() body) {
    try {
      const resultUploadFile = this.cloudinaryService.uploadFile(file);

      return resultUploadFile;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteImg(publicId: string) {
    try {
      const response = await this.cloudinaryService.deleteFile(publicId);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async updateImg(publicId: string) {
    try {
      const response = await this.cloudinaryService.deleteFile(publicId);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
