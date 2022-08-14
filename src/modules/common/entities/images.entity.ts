import { CategoriesEntity } from '../../categories/entities/categories.entity';
import { ProductEntity } from '../../product/entities/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn,
  UpdateDateColumn, OneToOne } from 'typeorm';
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
export class ImagesEntity {

  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public path!: string;

  @Column()
  public size!: number;

  @Column({ type: 'enum', enum: ImageType })
  public type!: ImageType;

  @OneToOne(() => ProductEntity, (product) => product.image)
  public product!: ProductEntity;

  @OneToOne(() => CategoriesEntity, (category) => category.image)
  public category!: CategoriesEntity;

  @OneToOne(() => UserEntity, (user) => user.image)
  public user!: CategoriesEntity;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;

}
