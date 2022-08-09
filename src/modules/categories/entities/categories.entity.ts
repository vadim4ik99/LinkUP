import { Product } from 'src/modules/product/entities/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Categories {

    @PrimaryGeneratedColumn()
      id: number;

    @Column()
      name: string;

    @ManyToOne(() => Product, (product) => product.categories)
      product: Product;

    @CreateDateColumn()
      created_at: Date;

    @UpdateDateColumn()
      updated_at: Date;

}
