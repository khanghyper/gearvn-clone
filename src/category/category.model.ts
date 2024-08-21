import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

export type CategoryDocument = Category & Document;

@Schema({
  timestamps: true,
  collection: 'Categories',
})
export class Category {
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
  })
  description: string

  @Prop({
    type: Types.ObjectId,
    ref: 'Category'
  })
  parentId: string

  @Prop({
    type: String,
  })
  image: string

  @Prop({
    type: Boolean,
    default: true
  })
  isActive: boolean

  @Prop({
    type: String
  })
  slug: string

}

export const CategorySchema = SchemaFactory.createForClass(Category);
