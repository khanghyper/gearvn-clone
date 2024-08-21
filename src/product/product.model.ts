import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Brand } from 'src/brand/brand.model';
import { Category } from 'src/category/category.model';
import { Discount } from 'src/discount/discount.model';
import { Image } from 'src/image/image.model';

/**-------------------------Product schema------------------------- */

export type ProductDocument = Product & Document;

@Schema({
  timestamps: true,
  collection: 'Products',
})
export class Product {
  @Prop({
    type: String,
    required: true
  })
  name: string;

  @Prop({
    type: String,
  })
  slug: string;

  @Prop({
    type: Number,
    required: true
  })
  price: number;

  @Prop({
    type: Types.ObjectId,
    ref: 'Image',
  })
  thumbnail: Image;

  @Prop([{
    type: Types.ObjectId,
    ref: 'Image',
    default: []
  }])
  images: Image[]

  @Prop()
  description: string;

  @Prop()
  sortDescription: string;

  @Prop({
    type: Number,
    default: 0
  })
  inventory: number;

  @Prop([{
    type: Types.ObjectId,
    ref: 'Category',
    default: []
  }])
  categories: Category[]

  // @Prop({
  //   type: String,
  //   enum: ['DRAFT', 'ACTIVE', 'ISDELETED'],
  //   default: 'ACTIVE',
  // })
  // status: string;
  @Prop({
    type: Types.ObjectId,
    ref: 'Brand',
  })
  brand: Brand

  @Prop([{
    name: {
      type: String,
    },
    value: {
      type: String
    }
  }])
  attributes: { name: string, value: string }[]

  @Prop({
    type: Types.ObjectId,
    ref: 'Discount'
  })
  discount: Discount

  @Prop({
    type: Number
  })
  priceSale: number

  @Prop({
    type: Boolean,
    default: true
  })
  status: boolean

  @Prop({
    type: String,

  })
  metaTitle: boolean

  @Prop({
    type: String,
  })
  metaKeyword: boolean

  @Prop({
    type: String,
  })
  metaDescription: boolean

}

const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.index({ name: 'text', description: 'text' });

export { ProductSchema };




/**-------------------------Image schema------------------------- */



/**-------------------------Attribute schema------------------------- */

export type AttributeDocument = Attribute & Document;

@Schema({
  timestamps: true,
  collection: 'Attributes',
})
export class Attribute {
  @Prop()
  name: string;
}

export const AtributeSchema = SchemaFactory.createForClass(Attribute);

/**-------------------------AttributeValue schema------------------------- */

export type AttributeValueDocument = AttributeValue & Document;

@Schema({
  timestamps: true,
  collection: 'AttributeValues',
})
export class AttributeValue {
  @Prop()
  value: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'Product',
  })
  product: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'Attribute',
  })
  attribute: string;
}

export const AttributeValueSchema =
  SchemaFactory.createForClass(AttributeValue);
