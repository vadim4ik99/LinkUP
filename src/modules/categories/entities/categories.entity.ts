import { CategoryProductEntity } from '../../product/entities/category-product.entity';
import { FileEntity } from '../../common/entities/images.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  RelationId,
} from 'typeorm';

@Entity()
export class CategoriesEntity {

  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name!: string;

  @ManyToOne(() => FileEntity, (image) => image.categories)
  public image!: FileEntity;

  @RelationId((category: CategoriesEntity) => category.image)
  public imageId!: number;

  @OneToMany(() => CategoryProductEntity, (catProd) => catProd.category)
  public categoryProducts!: CategoryProductEntity[];

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;

}
