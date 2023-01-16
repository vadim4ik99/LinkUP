import { CartEntity } from '../../cart/entities/cart.entity';
import { CategoryProductEntity } from './category-product.entity';
import { FileEntity } from '../../common/entities/images.entity';
import { OrderProductEntity } from './order-product.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

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

  @Column({ nullable: true })
  public sold?: number;

  @Column()
  public quantity!: number;

  @OneToMany(() => CartEntity, (cart) => cart.product)
  public carts!: CartEntity[];

  @OneToMany(() => CategoryProductEntity, (catProd) => catProd.product)
  public categoryProducts?: CategoryProductEntity[];

  @OneToMany(() => OrderProductEntity, (orderProd) => orderProd.product)
  public orderProducts?: OrderProductEntity[];

  @OneToMany(() => FileEntity, (image) => image.product)
  public images?: FileEntity[];

  // @RelationId((product: ProductEntity) => product.image)
  // public imageId?: number;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;

}
