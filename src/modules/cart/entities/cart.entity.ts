import { Product } from 'src/modules/product/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class Cart {

  @PrimaryGeneratedColumn()
  public id!: number;

  @OneToMany(() => Product, (product) => product.cart)
  public products!: Product[];

  @CreateDateColumn()
  public created_at!: Date;

  @UpdateDateColumn()
  public updated_at!: Date;

}
