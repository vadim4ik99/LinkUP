import { ProductEntity } from '../../product/entities/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';

@Entity()
export class CartEntity {

  @PrimaryGeneratedColumn()
  public id!: number;

  @ManyToOne(() => ProductEntity, (product) => product.carts)
  public product!: ProductEntity;

  @RelationId((cart: CartEntity) => cart.product)
  public productId!: number;

  @ManyToOne(() => UserEntity, (user) => user.carts)
  public user!: UserEntity;

  @RelationId((cart: CartEntity) => cart.user)
  public userId!: number;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;

}
