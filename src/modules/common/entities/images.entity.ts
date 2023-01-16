import { CategoriesEntity } from '../../categories/entities/categories.entity';
import { ProductEntity } from '../../product/entities/product.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';

@Entity()
export class FileEntity {

  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public path!: string;

  @Column()
  public size!: number;

  @ManyToOne(() => ProductEntity, (product) => product.images)
  public product?: ProductEntity;

  @RelationId((image: FileEntity) => image.product)
  public product_id?: number;

  @OneToMany(() => CategoriesEntity, (category) => category.image)
  public categories?: CategoriesEntity[];

  @OneToMany(() => UserEntity, (user) => user.avatar)
  public users?: UserEntity[];

  @CreateDateColumn()
  public createdAt!: Date;

}
