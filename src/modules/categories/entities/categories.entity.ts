import { CategoryProduct } from 'src/modules/common/entities/category-product.entity';
import { Images } from 'src/modules/common/entities/images.entity';
import { Product } from 'src/modules/product/entities/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn,
  ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Categories {

  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name!: string;

  @ManyToOne(() => Product, (product) => product.categories)
  public product!: Product;

  @OneToMany(() => Images ,(image) => image.category)
  public images!: Images[];

  @OneToMany(() => CategoryProduct ,(cat_prod) => cat_prod.category)
  public category_product!: CategoryProduct[];

  @CreateDateColumn()
  public created_at!: Date;

  @UpdateDateColumn()
  public updated_at!: Date;

}
