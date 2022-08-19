import { CategoriesEntity } from '../../categories/entities/categories.entity';
import { ProductEntity } from '../../product/entities/product.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';

export enum ImageType {
  GIF = 'gif',
  JPEG = 'jpeg',
  PJPEG = 'pjpeg',
  PNG = 'png',
  SVG = 'svg+xml',
  TIFF = 'tiff',
  WEBP = 'webp'
}

@Entity()
export class FileEntity {

  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public path!: string;

  @Column()
  public size!: number;

  @Column({ type: 'enum', enum: ImageType })
  public type!: ImageType;

  @OneToMany(() => ProductEntity, (product) => product.image)
  public products!: ProductEntity[];

  @OneToMany(() => CategoriesEntity, (category) => category.image)
  public categories!: CategoriesEntity[];

  @OneToMany(() => UserEntity, (user) => user.avatar)
  public users!: CategoriesEntity[];

  @CreateDateColumn()
  public createdAt!: Date;

}
