import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { APP_GUARD } from '@nestjs/core';
// import { AuthGuard } from 'src/auth/auth.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/model/user.model';
import { JwtModule } from '@nestjs/jwt';
import {
  AtributeSchema,
  Attribute,
  AttributeValue,
  AttributeValueSchema,
  Product,
  ProductSchema,
} from 'src/product/product.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Product.name,
        schema: ProductSchema,
      },

    ]),
    JwtModule,
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    CloudinaryService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ],
})
export class ProductModule { }
