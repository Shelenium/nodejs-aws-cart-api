import { Address, OrderItem, OrderStatus } from '../../shared';
export interface Order {
    id?: string;
    userId: string;
    items: OrderItem[];
    cartId: string;
    address: Address;
    statusHistory: Array<{
        status: OrderStatus.Open;
        timestamp: number;
        comment: string;
    }>;
}
