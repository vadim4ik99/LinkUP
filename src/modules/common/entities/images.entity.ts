import { CategoriesEntity } from 'src/modules/categories/entities/categories.entity';
import { ProductEntity } from 'src/modules/product/entities/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, UpdateDateColumn } from 'typeorm';

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
  public size!: string;

  @Column({ type: 'enum', enum: ImageType })
  public type!: ImageType;

  @ManyToOne(() => ProductEntity, (product) => product.images)
  public product!: ProductEntity;

  @ManyToOne(() => CategoriesEntity, (category) => category.images)
  public  category!: CategoriesEntity;

  @CreateDateColumn()
  public created_at!: Date;

  @UpdateDateColumn()
  public updated_at!: Date;

}
