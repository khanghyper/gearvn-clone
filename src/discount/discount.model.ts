import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Product } from "src/product/product.model";

export type DiscountDocument = Discount & Document;

@Schema({
  timestamps: true,
  collection: 'Discounts',
})
export class Discount {
  @Prop({
    type: String,
    required: true
  })
  name: string;

  @Prop({
    type: String,
    required: true
  })
  description: string;

  @Prop({
    type: String,
    required: true
  })
  textPercent: string;

  @Prop({
    type: Number,
    required: true
  })
  percent: string;

  @Prop({
    type: Boolean,
    default: true
  })
  active: boolean;

  @Prop([{
    type: Types.ObjectId,
    ref: 'Product',
    default: []
  }])
  products: Product[]

}

export const DiscountSchema = SchemaFactory.createForClass(Discount);
