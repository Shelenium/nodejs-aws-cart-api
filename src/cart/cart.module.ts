import { Module } from '@nestjs/common';

import { OrderModule } from '../order/order.module';

import { CartController } from './cart.controller';
import { CartDbService, CartService } from './services';

@Module({
  imports: [OrderModule],
  providers: [CartService, CartDbService],
  controllers: [CartController, CartDbService],
})
export class CartModule {}
