import { CategoriesEntity } from '../../categories/entities/categories.entity';
import { ProductEntity } from './product.entity';
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class CategoryProductEntity {

  @PrimaryGeneratedColumn()
  public id!: number;

  @ManyToOne(() => ProductEntity, (product) => product.categoryProduct)
  public product!: ProductEntity;

  @ManyToOne(() => CategoriesEntity, (category) => category.categoryProduct)
  public category!: CategoriesEntity;

  @CreateDateColumn()
  public createdAt!: Date;

}
