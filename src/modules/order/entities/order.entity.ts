import { OrderProductEntity } from '../../product/entities/order-product.entity';
import { UserEntity } from '../../user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';

export enum OrderStatus {
  PAID = 'paid',
  PACKING = 'packing',
  SHIPPING = 'shipping',
  DELIVERED = 'deliverd',
}

@Entity()
export class OrderEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PACKING })
  public status!: OrderStatus;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  public user!: UserEntity;

  @RelationId((order: OrderEntity) => order.user)
  public userId!: number;

  @OneToMany(() => OrderProductEntity, (orderProd) => orderProd.order)
  public orderProducts!: OrderProductEntity[];

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;
}
