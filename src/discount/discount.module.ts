import { Module } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { DiscountController } from './discount.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Discount, DiscountSchema } from 'src/discount/discount.model';

@Module({
  controllers: [DiscountController],
  providers: [DiscountService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Discount.name,
        schema: DiscountSchema
      }
    ])
  ]
})
export class DiscountModule { }
