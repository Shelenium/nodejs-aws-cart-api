import { CartEntity } from '../../cart';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { OrderStatus } from '../models';


@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  user_id: string;

  @ManyToOne(() => CartEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cart_id' })
  cart: CartEntity;

  @Column({ type: 'uuid', nullable: false })
  cart_id: string;

  @Column({ type: 'json', nullable: false })
  payment: Record<string, any>;

  @Column({ type: 'json', nullable: false })
  delivery: Record<string, any>;

  @Column({ type: 'text', nullable: true })
  comments: string;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    nullable: false,
  })
  status: OrderStatus;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: false })
  total: number;
}
