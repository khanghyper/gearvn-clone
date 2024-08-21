import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Image } from 'src/image/image.model';
import * as _ from 'lodash'

@Injectable()
export class ImageService {
  constructor(
    @InjectModel(Image.name) private readonly imageModel: Model<Image>,
    private readonly cloudinaryService: CloudinaryService
  ) { }

  uploadImage = async (file: Express.Multer.File) => {
    try {
      const uploadImageRes = await this.cloudinaryService.uploadFile(file);
      if (!uploadImageRes) throw new BadRequestException();
      const createImageRes = await this.imageModel.create({
        publicId: uploadImageRes.public_id,
        url: uploadImageRes.url,
      })

      return {
        message: 'ok',
        data: {
          _id: createImageRes._id
        }

      }
    } catch (error) {
      return error.response
    }
  }
  uploadImageInEditor = async (file: Express.Multer.File) => {
    try {
      const uploadImageRes = await this.cloudinaryService.uploadFileInEditor(file);
      if (!uploadImageRes) throw new BadRequestException();
      const createImageRes = await this.imageModel.create({
        publicId: uploadImageRes.public_id,
        url: uploadImageRes.url,
      })
      return {
        message: 'ok',
        data: {
          url: uploadImageRes.url
        }
      }
    } catch (error) {
      return error.response
    }
  }
}
