import { Order } from 'src/modules/order/entities/order.entity';
import { Product } from 'src/modules/product/entities/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, UpdateDateColumn } from 'typeorm';


@Entity()
export class OrderProduct {

    @PrimaryGeneratedColumn()
      id: number;

    @Column()
      cost: number;

    @Column()
      quantity: number;

    @ManyToOne(() => Product, (product) => product.order_product)
      product: Product;

    @ManyToOne(() => Order, (order) => order.order_product)
    order: Order;

    @CreateDateColumn()
      created_at: Date;

    @UpdateDateColumn()
      updated_at: Date;

}