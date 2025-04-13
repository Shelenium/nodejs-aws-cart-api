import { forwardRef, Module } from '@nestjs/common';

import { OrderModule } from '../order/order.module';

import { CartController } from './cart.controller';
import { CartDbService, CartService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity, CartItemEntity, ProductEntity } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartEntity, CartItemEntity, ProductEntity]),
    forwardRef(() => OrderModule),
  ],
  providers: [CartService, CartDbService],
  controllers: [CartController],
})
export class CartModule {}
