import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Discount } from 'src/discount/discount.model';

@Injectable()
export class DiscountService {
  constructor(
    @InjectModel(Discount.name) private readonly discountModel: Model<Discount>
  ) { }

  create = async (payload: any) => {
    try {
      const createDiscountRes = await this.discountModel.create({ ...payload })
      return {
        message: 'OK',
        data: createDiscountRes
      }
    } catch (error) {
      console.log(error);
    }
  }
}
