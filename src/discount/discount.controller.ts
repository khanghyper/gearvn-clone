import { Body, Controller, Post } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { Public } from 'src/auth/auth.decorator';

@Controller('discounts')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) { }

  @Public()
  @Post('discount')
  create(@Body() payload: any) {
    return this.discountService.create(payload)
  }
}
