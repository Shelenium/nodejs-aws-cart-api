import { OrderStatus } from '../../entities';
import { Address, OrderItem } from '../../shared';

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
