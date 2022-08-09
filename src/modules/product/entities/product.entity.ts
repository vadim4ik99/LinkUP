import { Cart } from 'src/modules/cart/entities/cart.entity';
import { Categories } from 'src/modules/categories/entities/categories.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
@Entity()
export class Product {

    @PrimaryGeneratedColumn()
      id: number;

    @Column()
      title: string;

    @Column()
      price: number;

    @Column()
      description_small: string;

    @Column()
      description_full: string;

    @Column()
      sold: number;

    @Column()
      quantity: number;
    
    @ManyToOne(() => Cart, (cart) => cart.products)
      cart: Cart;

    @CreateDateColumn()
      created_at: Date;

    @UpdateDateColumn()
      updated_at: Date;

}