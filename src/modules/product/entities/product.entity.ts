import { Cart } from 'src/modules/cart/entities/cart.entity';
import { Categories } from 'src/modules/categories/entities/categories.entity';
import { CategoryProduct } from 'src/modules/common/entities/category-product.entity';
import { Images } from 'src/modules/common/entities/images.entity';
import { OrderProduct } from 'src/modules/common/entities/order-product.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn,
  ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Product {

  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public title!: string;

  @Column()
  public price!: number;

  @Column()
  public description_small!: string;

  @Column()
  public description_full!: string;

  @Column()
  public sold!: number;

  @Column()
  public quantity!: number;

  @ManyToOne(() => Cart, (cart) => cart.products)
  public cart!: Cart;

  @OneToMany(() => Categories, (cat) => cat.product)
  public categories!: Categories[];

  @OneToMany(() => Images, (image) => image.product)
  public images!: Images[];

  @OneToMany(() => CategoryProduct, (cat_prod) => cat_prod.product)
  public category_product!: CategoryProduct[];

  @OneToMany(() => OrderProduct, (order_prod) => order_prod.product)
  public order_product!: OrderProduct[];

  @CreateDateColumn()
  public created_at!: Date;

  @UpdateDateColumn()
  public updated_at!: Date;

}
