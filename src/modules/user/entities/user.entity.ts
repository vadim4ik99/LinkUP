import { CartEntity } from '../../cart/entities/cart.entity';
import { ImagesEntity } from '../../common/entities/images.entity';
import { OrderEntity } from '../../order/entities/order.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class UserEntity {

  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public firstName!: string;

  @Column()
  public lastName!: string;

  @Column()
  public verify!: boolean;

  @Column()
  public email!: string;

  @Column()
  public password!: string;

  @OneToOne(() => CartEntity, (cart) => cart.user)
  @JoinColumn()
  public cart!: CartEntity;

  @OneToOne(() => ImagesEntity, (image) => image.user)
  @JoinColumn()
  public image!: ImagesEntity;

  @OneToMany(() => OrderEntity, (order) => order.user)
  public orders!: OrderEntity[];

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;

}
