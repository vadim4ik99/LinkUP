import { CategoryProductEntity } from '../../product/entities/category-product.entity';
import { ImagesEntity } from '../../common/entities/images.entity';
import { ProductEntity } from '../../product/entities/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn,
  ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class CategoriesEntity {

  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name!: string;

  @ManyToOne(() => ProductEntity, (product) => product.categories)
  public product!: ProductEntity;

  @OneToMany(() => ImagesEntity ,(image) => image.category)
  public images!: ImagesEntity[];

  @OneToMany(() => CategoryProductEntity ,(catProd) => catProd.category)
  public categoryProduct!: CategoryProductEntity[];

  @CreateDateColumn()
  public createdAat!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;

}
