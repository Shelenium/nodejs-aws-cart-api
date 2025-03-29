import { Cart } from '../models';
import { CartItem } from '../../shared';
export declare class CartService {
    private userCarts;
    findByUserId(userId: string): Cart;
    createByUserId(user_id: string): Cart;
    findOrCreateByUserId(userId: string): Cart;
    updateByUserId(userId: string, payload: CartItem): Cart;
    removeByUserId(userId: string): void;
}
