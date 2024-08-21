import { Injectable, UploadedFile, Query, Body, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, ObjectId } from 'mongoose';
import { ProductQueryDto } from 'src/product/product.dto';
import { omit } from 'lodash';
import {
  Product,
} from 'src/product/product.model';

// interface TestProductI {
//   name: string,
//   thumb: string,
//   price: number,
//   promotion: string
// }

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) { }

  getList = async () => {
    const response = await this.productModel.find({})
      .populate('brand')
      .populate('categories')
      .populate('thumbnail')
      .populate('images')
      .select('-__v -createdAt -updatedAt')

    return {
      message: 'OK',
      data: response
    }
  }

  create = async (payload: any) => {
    try {
      const foundProduct = await this.productModel.findOne({
        name: payload.name
      })
      if (foundProduct) throw new UnprocessableEntityException({
        errors: [
          { field: 'name', message: 'san pham da ton tai!' }
        ],
        message: 'Entity error!',
        statusCode: 422
      })

      const foo = payload.categories.map((item: string) => {
        return new Types.ObjectId(item)
      })

      console.log({ foo });

      const createProductRes = await this.productModel.create({ ...payload });
      return {
        message: 'OK',
        data: createProductRes
      }
    } catch (error) {
      console.log(error);
    }
  }


}
