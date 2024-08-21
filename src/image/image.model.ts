import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type CategoryDocument = Image & Document;

@Schema({
  timestamps: true,
  collection: 'Images'
})
export class Image {

  @Prop({
    type: String,
    required: true
  })
  publicId: string

  @Prop({
    type: String,
    required: true
  })
  url: string

  @Prop({
    type: Boolean,
    required: true,
    default: true
  })
  isDeleted: boolean
}

export const ImageSchema = SchemaFactory.createForClass(Image);
