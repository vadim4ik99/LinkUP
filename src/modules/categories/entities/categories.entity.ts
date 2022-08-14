import { CategoryProductEntity } from '../../product/entities/category-product.entity';
import { ImagesEntity } from '../../common/entities/images.entity';
import { ProductEntity } from '../../product/entities/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn,
  OneToMany, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class CategoriesEntity {

  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name!: string;

  @OneToOne(() => ImagesEntity, (image) => image.category)
  @JoinColumn()
  public image!: ImagesEntity;

  @OneToMany(() => ProductEntity, (product) => product.category)
  public products!: ProductEntity[];

  @OneToMany(() => CategoryProductEntity, (catProd) => catProd.category)
  public categoryProduct!: CategoryProductEntity[];

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;

}
