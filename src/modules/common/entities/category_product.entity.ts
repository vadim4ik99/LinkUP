import { Categories } from 'src/modules/categories/entities/categories.entity';
import { Product } from 'src/modules/product/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, UpdateDateColumn } from 'typeorm';

@Entity()
export class CategoryProduct {

    @PrimaryGeneratedColumn()
      id: number;

    @ManyToOne(() => Product, (product) => product.category_product)
      product: Product;

    @ManyToOne(() => Categories, (category) => category.category_product)
      category: Categories;

    @CreateDateColumn()
      created_at: Date;

    @UpdateDateColumn()
      updated_at: Date;

}