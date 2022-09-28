import { OrderEntity } from '../../order/entities/order.entity';
import { ProductEntity } from './product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  RelationId,
} from 'typeorm';

@Entity()
export class OrderProductEntity {

  @PrimaryGeneratedColumn()
  public id!: number;

  @ManyToOne(() => ProductEntity, (product) => product.orderProducts)
  public product!: ProductEntity;

  @RelationId((orderProduct: OrderProductEntity) => orderProduct.product)
  public productId!: number;

  @ManyToOne(() => OrderEntity, (order) => order.orderProducts)
  public order!: OrderEntity;

  @RelationId((orderProduct: OrderProductEntity) => orderProduct.order)
  public orderId!: number;

  @CreateDateColumn()
  public createdAt!: Date;

}
