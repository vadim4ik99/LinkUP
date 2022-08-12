import { OrderProductEntity } from '../../product/entities/order-product.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn,
  ManyToOne, OneToMany } from 'typeorm';

export enum OrderStatus {
    PAID = 'paid',
    PACKING = 'packing',
    SHIPPING = 'shipping',
    DELIVERED = 'deliverd'
}

@Entity()
export class OrderEntity {

  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PACKING })
  public status!: OrderStatus;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  public user!: UserEntity;

  @OneToMany(() => OrderProductEntity, (orderProd) => orderProd.order)
  public orderProduct!: OrderProductEntity[];

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;

}
