import { ProductEntity } from '../../product/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToOne } from 'typeorm';
import { UserEntity } from 'src/modules/user/entities/user.entity';

@Entity()
export class CartEntity {

  @PrimaryGeneratedColumn()
  public id!: number;

  @ManyToOne(() => ProductEntity, (product) => product.carts)
  public product!: ProductEntity;

  @OneToOne(() => UserEntity, (user) => user.cart)
  public user!: UserEntity;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;

}
