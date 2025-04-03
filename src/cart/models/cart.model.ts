import { CartItem } from '../../shared';

export enum CartStatus {
  OPEN = 'OPEN',
  ORDERED = 'ORDERED',
}

export type Cart = {
  id: string;
  user_id: string;
  created_at: number;
  updated_at: number;
  status: CartStatus;
  items: CartItem[];
};
