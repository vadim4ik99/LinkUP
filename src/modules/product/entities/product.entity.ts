import { CartEntity } from '../../cart/entities/cart.entity';
import { CategoriesEntity } from '../../categories/entities/categories.entity';
import { CategoryProductEntity } from './category-product.entity';
import { ImagesEntity } from '../../common/entities/images.entity';
import { OrderProductEntity } from './order-product.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn,
  ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class ProductEntity {

  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public title!: string;

  @Column()
  public price!: number;

  @Column('text')
  public descriptionSmall!: string;

  @Column('text')
  public descriptionFull!: string;

  @Column()
  public sold!: number;

  @Column()
  public quantity!: number;

  @ManyToOne(() => CartEntity, (cart) => cart.products)
  public cart!: CartEntity;

  @OneToMany(() => CategoriesEntity, (cat) => cat.product)
  public categories!: CategoriesEntity[];

  @OneToMany(() => ImagesEntity, (image) => image.product)
  public images!: ImagesEntity[];

  @OneToMany(() => CategoryProductEntity, (catProd) => catProd.product)
  public categoryProduct!: CategoryProductEntity[];

  @OneToMany(() => OrderProductEntity, (orderProd) => orderProd.product)
  public orderProduct!: OrderProductEntity[];

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;

}
