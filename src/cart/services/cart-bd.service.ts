import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartEntity, CartItemEntity, ProductEntity } from '../entities';
import { CartStatus } from '../models';
import { CartItem, ProductItem } from '../../shared';

@Injectable()
export class CartDbService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,

    @InjectRepository(CartItemEntity)
    private readonly cartItemRepository: Repository<CartItemEntity>,

    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async createCart(userId: string): Promise<CartEntity> {
    const cart = this.cartRepository.create({
      user_id: userId,
      status: CartStatus.OPEN,
    });
    return await this.cartRepository.save(cart);
  }

  async findCartByUserId(user_id: string): Promise<CartEntity | null> {
    const cart = await this.cartRepository.findOne({
      where: { user_id },
      relations: ['cartItems'],
    });
  
    return cart || null;
  }

  async findOrCreateByUserId(user_id: string): Promise<CartEntity> {
    const cart: CartEntity = await this.findCartByUserId(user_id);
    return cart || await this.createCart(user_id);
  }

  async removeByUserId(user_id: string): Promise<void> {
    await this.cartRepository.delete({ user_id });
  }

  async updateCartByUserId(user_id: string, cartItem: CartItem): Promise<CartEntity> {
    const cart: CartEntity = await this.findOrCreateByUserId(user_id);
    const product = await this.findOrCreateProduct(cartItem.product)
    await this.addOrUpdateCartItem(cart.id, product.id, cartItem.count);
    return await this.findCartByUserId(user_id);
  }

  async addOrUpdateCartItem(cart_id: string, product_id: string, count: number): Promise<CartItemEntity> {
    const existingItem = await this.cartItemRepository.findOne({
      where: { cart_id, product_id },
    });

    if (existingItem) {
      existingItem.count += count;
      if (existingItem.count <= 0) {
        await this.cartItemRepository.delete({ cart_id, product_id });
      }
      return await this.cartItemRepository.save(existingItem);
    } else {
      const newItem = this.cartItemRepository.create({
        cart_id,
        product_id,
        count,
      });
      return await this.cartItemRepository.save(newItem);
    }
  }

  private async findOrCreateProduct(payload: ProductItem): Promise<ProductEntity> {
    const foundedProduct = await this.productRepository.findOne({
      where: { id: payload.id },
    });

    if (foundedProduct) {
      return foundedProduct;
    }

    const newProduct = this.productRepository.create(payload);

    return await this.productRepository.save(newProduct);
  }

  async updateOrderStatus(user_id: string, status: CartStatus): Promise<CartEntity> {
    const cart: CartEntity = await this.findCartByUserId(user_id);
    cart.status = status;
    return await this.cartRepository.save(cart);
  }
}
