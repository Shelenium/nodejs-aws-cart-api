import { Order, OrderService } from '../order';
import { AppRequest, CartItem, CreateOrderDto } from '../shared';
import { CartService } from './services';
export declare class CartController {
    private cartService;
    private orderService;
    constructor(cartService: CartService, orderService: OrderService);
    findUserCart(req: AppRequest): CartItem[];
    updateUserCart(req: AppRequest, body: CartItem): CartItem[];
    clearUserCart(req: AppRequest): void;
    checkout(req: AppRequest, body: CreateOrderDto): {
        order: Order;
    };
    getOrder(): Order[];
}
