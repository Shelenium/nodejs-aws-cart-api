import { Injectable } from '@nestjs/common';
import { Order, OrderStatus } from '../models';
import { CreateOrderPayload } from '../../shared';
import { OrderEntity } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderDbService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  async getAll(): Promise<OrderEntity[]> {
    return await this.orderRepository.find({ relations: ['cartItems'] });
  }

  async findById(orderId: string): Promise<OrderEntity | null> {
    const order: OrderEntity = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['cartItems'],
    });
  
    return order || null;
  }

  async create(orderData: Partial<CreateOrderPayload>): Promise<OrderEntity> {
    const newOrder = this.orderRepository.create({
        user_id: orderData.userId,
        cart_id: orderData.cartId,
        payment: {
          total: orderData.total,
          statusHistory: [{
            comment: orderData.address.comment,
            status: OrderStatus.OPEN,
            timestamp: Date.now(),
          }],
        },
        delivery: {
          address: orderData.address,
        },
        comments: orderData.address.comment,
        status: OrderStatus.OPEN,
      }
    );
    return await this.orderRepository.save(newOrder);
  }

  // TODO add  type
  async update(orderId: string, data: Order): Promise<OrderEntity> {
    const order: OrderEntity = await this.findById(orderId);

    if (!order) {
      throw new Error('Order does not exist.');
    }

    return await this.orderRepository.save({
      ...order,
      user_id: data.userId,
      cart_id: data.cartId,
      payment: {
        statusHistory: [
          ...order.payment.statusHistory,
          data.statusHistory,
        ],
      },
      delivery: {
        address: data.address,
      },
      comments: data.address.comment,
      cartItems: data.items,
    });
  }
}
