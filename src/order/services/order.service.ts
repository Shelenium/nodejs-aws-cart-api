import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Order } from '../models';
import { CreateOrderPayload } from '../../shared';
import { OrderStatus } from '../../entities';

@Injectable()
export class OrderService {
  private orders: Record<string, Order> = {};

  getAll(): Order[] {
    return Object.values(this.orders);
  }

  findById(orderId: string): Order {
    return this.orders[orderId];
  }

  create(data: CreateOrderPayload): Order {
    const id = randomUUID() as string;
    const order: Order = {
      id,
      ...data,
      statusHistory: [
        {
          comment: '',
          status: OrderStatus.OPEN,
          timestamp: Date.now(),
        },
      ],
    };

    this.orders[id] = order;

    return order;
  }

  // TODO add  type
  update(orderId: string, data: Order): void {
    const order = this.findById(orderId);

    if (!order) {
      throw new Error('Order does not exist.');
    }

    this.orders[orderId] = {
      ...data,
      id: orderId,
    };
  }
}
