import { CategoriesEntity } from '../../categories/entities/categories.entity';
import { ProductEntity } from './product.entity';
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, UpdateDateColumn } from 'typeorm';

@Entity()
export class CategoryProductEntity {

  @PrimaryGeneratedColumn()
  public id!: number;

  @ManyToOne(() => ProductEntity, (product) => product.categoryProduct)
  public product!: ProductEntity;

  @ManyToOne(() => CategoriesEntity, (category) => category.categoryProduct)
  public category!: CategoriesEntity;

  @CreateDateColumn()
  public created_at!: Date;

  @UpdateDateColumn()
  public updated_at!: Date;

}
