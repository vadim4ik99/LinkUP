import { CartEntity } from '../../cart/entities/cart.entity';
import { CategoriesEntity } from '../../categories/entities/categories.entity';
import { CategoryProductEntity } from './category-product.entity';
import { ImagesEntity } from '../../common/entities/images.entity';
import { OrderProductEntity } from './order-product.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn,
  ManyToOne, OneToMany, OneToOne } from 'typeorm';

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

  @OneToOne(() => ImagesEntity, (image) => image.product)
  public image!: ImagesEntity;

  @OneToMany(() => CartEntity, (cart) => cart.product)
  public carts!: CartEntity[];

  @OneToMany(() => CategoryProductEntity, (catProd) => catProd.product)
  public categoryProduct!: CategoryProductEntity[];

  @OneToMany(() => OrderProductEntity, (orderProd) => orderProd.product)
  public orderProduct!: OrderProductEntity[];

  @ManyToOne(() => CategoriesEntity, (cat) => cat.products)
  public category!: CategoriesEntity;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;

}
