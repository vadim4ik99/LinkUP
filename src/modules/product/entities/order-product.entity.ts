import { OrderEntity } from 'src/modules/order/entities/order.entity';
import { ProductEntity } from 'src/modules/product/entities/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class OrderProductEntity {

  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public cost!: number;

  @Column()
  public quantity!: number;

  @ManyToOne(() => ProductEntity, (product) => product.orderProduct)
  public product!: ProductEntity;

  @ManyToOne(() => OrderEntity, (order) => order.orderProducts)
  public order!: OrderEntity;

  @CreateDateColumn()
  public created_at!: Date;

}
