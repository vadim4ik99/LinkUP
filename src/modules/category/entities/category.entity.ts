/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { Product } from 'src/modules/product/entities/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
      id: number;

    @Column({ length:100 })
      name: string;

    @ManyToOne(() => Product, (product) => product.category)
      product: Product;

    @CreateDateColumn()
      created_at: Date;

    @UpdateDateColumn()
      updated_at: Date;

}
