export enum OrderStatus {
  Open = 'OPEN',
  Approved = 'APPROVED',
  Confirmed = 'CONFIRMED',
  Sent = 'SENT',
  Completed = 'COMPLETED',
  Cancelled = 'CANCELLED',
}

export interface StatusItem {
  status: OrderStatus;
  timestamp: number;
  comment: string;
}

export type StatusHistory = StatusItem[];

export interface Address {
  address: string;
  firstName: string;
  lastName: string;
  comment: string;
};

export interface OrderItem {
  productId: string;
  count: number;
}

export interface CreateOrderDto {
  items: OrderItem[];
  address: Address;
};

export interface ProductItem {
  description: string;
  id: string;
  title: string;
  price: number;
}

export interface CartItem {
  product: ProductItem;
  count: number;
}

export interface PayloadItem {
  productId: string;
  count: number;
}

export interface CreateOrderPayload {
  userId: string;
  cartId: string;
  items: PayloadItem[];
  address: Address;
  total: number;
}
