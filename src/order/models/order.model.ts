import { Address, OrderItem } from '../../shared';
import { OrderStatus } from './order-status.enum';

export interface Order {
  id?: string;
  userId: string;
  items: OrderItem[];
  cartId: string;
  address: Address;
  statusHistory: Array<{
    status: OrderStatus.OPEN;
    timestamp: number;
    comment: string;
  }>;
};
