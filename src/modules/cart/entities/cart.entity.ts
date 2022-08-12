import { ProductEntity } from '../../product/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class CartEntity {

  @PrimaryGeneratedColumn()
  public id!: number;

  @OneToMany(() => ProductEntity, (product) => product.cart)
  public products!: ProductEntity[];

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;

}
