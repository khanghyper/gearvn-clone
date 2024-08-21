import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Brand } from 'src/brand/brand.model';

@Injectable()
export class BrandService {
  constructor(
    @InjectModel(Brand.name) private readonly brandModel: Model<Brand>
  ) { }

  findAll = async () => {
    try {
      const foundBrands = await this.brandModel.find({});

      return {
        message: 'OK',
        data: foundBrands
      }
    } catch (error) {
      console.log(error);
    }
  }

  create = async (payload: any) => {
    try {
      const foundBrand = await this.brandModel.findOne({ name: payload.name });
      if (foundBrand) throw new UnprocessableEntityException({
        errors: [
          {
            field: 'name',
            message: 'Hãng đã tồn tại!'
          }
        ],
        statusCode: 422,
        message: 'Entity Error!'
      })

      const createBrandRes = await this.brandModel.create(payload);

      return {
        message: 'OK',
        data: createBrandRes
      }

    } catch (error) {
      console.log(error);
    }
  }
}
