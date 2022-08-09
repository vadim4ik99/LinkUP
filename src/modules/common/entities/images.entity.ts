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
      id: number;

    @Column()
      path: string;

    @Column()
      size: string;

    @Column({type: "enum", enum: ImageType})
      type: ImageType;

    @ManyToOne(() => Product, (product) => product.images)
      product: Product;

    @ManyToOne(() => Categories, (category) => category.images)
        category: Categories;

    @CreateDateColumn()
      created_at: Date;

    @UpdateDateColumn()
      updated_at: Date;

}