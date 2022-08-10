import { Order } from 'src/modules/order/entities/order.entity';
import { Product } from 'src/modules/product/entities/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, UpdateDateColumn } from 'typeorm';

@Entity()
export class OrderProduct {

  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public cost!: number;

  @Column()
  public quantity!: number;

  @ManyToOne(() => Product, (product) => product.order_product)
  public product!: Product;

  @ManyToOne(() => Order, (order) => order.order_product)
  public order!: Order;

  @CreateDateColumn()
  public created_at!: Date;

  @UpdateDateColumn()
  public updated_at!: Date;

}
