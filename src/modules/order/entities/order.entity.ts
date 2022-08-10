import { OrderProduct } from 'src/modules/common/entities/order-product.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn,
  ManyToOne, OneToMany } from 'typeorm';

export enum OrderStatus {
    PAID = 'paid',
    PACKING = 'packing',
    SHIPPING = 'shipping',
    DELIVERED = 'deliverd'
}

@Entity()
export class Order {

  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PACKING })
  public status!: OrderStatus;

  @ManyToOne(() => User, (user) => user.orders)
  public user!: User;

  @OneToMany(() => OrderProduct, (order_prod) => order_prod.order)
  public order_product!: OrderProduct[];

  @CreateDateColumn()
  public created_at!: Date;

  @UpdateDateColumn()
  public updated_at!: Date;

}
