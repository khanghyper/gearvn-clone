import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

export type BrandDocument = Brand & Document;

@Schema({
  timestamps: true,
  collection: 'Brands',
})
export class Brand {
  @Prop({
    type: String,
    required: true
  })
  name: string

  @Prop({
    type: String,
  })
  description: string

  @Prop({
    type: Boolean,
    default: true
  })
  isActive: boolean
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
