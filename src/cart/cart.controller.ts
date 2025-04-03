import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CartItemEntity, OrderEntity } from '../entities';
import { BasicAuthGuard } from '../auth';
import { OrderDbService } from '../order';
import { AppRequest, CartItem, CreateOrderDto, getUserIdFromRequest } from '../shared';
import { calculateCartTotal } from './models-rules';
import { CartDbService } from './services';
import { CartStatus } from './models';

@Controller('api/profile/cart')
export class CartController {
  constructor(
    private cartDbService: CartDbService,
    private orderDbService: OrderDbService,
  ) {}

  // @UseGuards(JwtAuthGuard)
  @UseGuards(BasicAuthGuard)
  @Get()
  async findUserCart(@Req() req: AppRequest): Promise<CartItemEntity[]> {
    const cart = await this.cartDbService.findOrCreateByUserId(
      getUserIdFromRequest(req),
    );

    return cart.cartItems;
  }

  // @UseGuards(JwtAuthGuard)
  @UseGuards(BasicAuthGuard)
  @Put()
  async updateUserCart(
    @Req() req: AppRequest,
    @Body() body: CartItem,
  ): Promise<CartItemEntity[]> {
    // TODO: validate body payload...
    const cart = await this.cartDbService.updateCartByUserId(
      getUserIdFromRequest(req),
      body,
    );

    return cart.cartItems;
  }

  // @UseGuards(JwtAuthGuard)
  @UseGuards(BasicAuthGuard)
  @Delete()
  @HttpCode(HttpStatus.OK)
  async clearUserCart(@Req() req: AppRequest): Promise<void> {
    await this.cartDbService.removeByUserId(getUserIdFromRequest(req));
  }

  // @UseGuards(JwtAuthGuard)
  @UseGuards(BasicAuthGuard)
  @Put('order')
  async checkout(@Req() req: AppRequest, @Body() body: CreateOrderDto): Promise<{ order: OrderEntity }> {
    const userId = getUserIdFromRequest(req);
    const cart = await this.cartDbService.findCartByUserId(userId);

    if (!cart?.cartItems.length) {
      throw new BadRequestException('Cart is empty');
    }

    const { id: cartId, cartItems } = cart;
    const total = calculateCartTotal(body.items);
    const order: OrderEntity = await this.orderDbService.create({
      userId,
      cartId,
      items: cartItems.map(({ product_id, count }) => ({
        productId: product_id,
        count,
      })),
      address: body.address,
      total,
    });
    await this.cartDbService.updateOrderStatus(getUserIdFromRequest(req), CartStatus.ORDERED);

    return {
      order,
    };
  }

  @UseGuards(BasicAuthGuard)
  @Get('order')
  async getOrder(): Promise<OrderEntity[]> {
    return await this.orderDbService.getAll();
  }
}
