import { Module } from '@nestjs/common';
import { OrderDbService, OrderService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity]),
  ]
  ,
  providers: [OrderService, OrderDbService],
  exports: [OrderService, OrderDbService],
})
export class OrderModule {}
