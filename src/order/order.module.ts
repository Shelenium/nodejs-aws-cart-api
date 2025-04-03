import { Module } from '@nestjs/common';
import { OrderDbService, OrderService } from './services';

@Module({
  providers: [OrderService, OrderDbService],
  exports: [OrderService, OrderDbService],
})
export class OrderModule {}
