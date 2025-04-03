import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { CartItemEntity } from './cart-item.entity';
import { CartStatus } from '../cart';

@Entity({ name: 'carts' })
export class CartEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  user_id: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @Column({ 
    type: 'enum',
    enum: CartStatus,
    nullable: false,
  })
  status: CartStatus;

  @OneToMany(() => CartItemEntity, (cartItem) => cartItem.cart, { cascade: true })
  cartItems: CartItemEntity[];
}
