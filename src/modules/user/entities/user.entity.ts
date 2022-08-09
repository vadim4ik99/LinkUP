/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { Cart } from 'src/modules/cart/entities/cart.entity';
import { Orders } from 'src/modules/order/entities/order.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
      id: number;

    @Column({ length:100 })
      first_name: string;

    @Column({ length:100 })
      last_name: string;

    @Column()
      verify: boolean;

    @Column({ length:100 })
      email: string;

    @Column()
      avatar: string;

    @Column()
      password: string;

    @OneToMany(()=> Orders, (order)=> order.user)
      orders: Orders[];

    @CreateDateColumn()
      created_at: Date;

    @UpdateDateColumn()
      updated_at: Date;

}
