import { Module } from '@nestjs/common';
import { OrderDbService, OrderService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities';
import { CartEntity } from '../cart';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, CartEntity]),
  ]
  ,
  providers: [OrderService, OrderDbService],
  exports: [OrderService, OrderDbService],
})
export class OrderModule {}
