/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { Category } from 'src/modules/category/entities/category.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
      id: number;

    @Column()
      title: string;

    @Column()
      price: number;

    @Column('text')
      description_small: string;

    @Column('text')
      description_full: string;

    @Column()
      sold: number;

    @Column()
      quantity: number;

    @OneToMany(()=> Category, (category) => category.product)
      category: Category[];

    @CreateDateColumn()
      created_at: Date;

    @UpdateDateColumn()
      updated_at: Date;

}
