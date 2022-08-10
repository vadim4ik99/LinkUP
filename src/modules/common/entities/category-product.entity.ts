import { Categories } from 'src/modules/categories/entities/categories.entity';
import { Product } from 'src/modules/product/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, UpdateDateColumn } from 'typeorm';

@Entity()
export class CategoryProduct {

  @PrimaryGeneratedColumn()
  public id!: number;

  @ManyToOne(() => Product, (product) => product.category_product)
  public product!: Product;

  @ManyToOne(() => Categories, (category) => category.category_product)
  public category!: Categories;

  @CreateDateColumn()
  public created_at!: Date;

  @UpdateDateColumn()
  public updated_at!: Date;

}
