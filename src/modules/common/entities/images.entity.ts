import { Categories } from 'src/modules/categories/entities/categories.entity';
import { Product } from 'src/modules/product/entities/product.entity';
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
export class Images {

  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public path!: string;

  @Column()
  public size!: string;

  @Column({ type: 'enum', enum: ImageType })
  public type!: ImageType;

  @ManyToOne(() => Product, (product) => product.images)
  public product!: Product;

  @ManyToOne(() => Categories, (category) => category.images)
  public  category!: Categories;

  @CreateDateColumn()
  public created_at!: Date;

  @UpdateDateColumn()
  public updated_at!: Date;

}
