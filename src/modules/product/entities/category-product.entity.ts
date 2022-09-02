import { CategoriesEntity } from '../../categories/entities/categories.entity';
import { ProductEntity } from './product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  RelationId,
} from 'typeorm';

@Entity()
export class CategoryProductEntity {

  @PrimaryGeneratedColumn()
  public id!: number;

  @ManyToOne(() => ProductEntity, (product) => product.categoryProducts)
  public product!: ProductEntity;

  @RelationId(
    (categoryProduct: CategoryProductEntity) => categoryProduct.product,
  )
  public productId!: number;

  @ManyToOne(() => CategoriesEntity, (category) => category.categoryProducts)
  public category!: CategoriesEntity;

  @RelationId(
    (categoryProduct: CategoryProductEntity) => categoryProduct.category,
  )
  public categoryId!: number;

  @CreateDateColumn()
  public createdAt!: Date;

}
