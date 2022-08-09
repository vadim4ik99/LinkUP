/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { User } from 'src/modules/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

export enum Order_Status {
    PAID = 'paid',
    PACKING = 'packing',
    SHIPPING ='shipping',
    DELIVERED = 'delivered'
}

@Entity()
export class Orders {

    @PrimaryGeneratedColumn()
      id: number;

    @Column()
      user_id: number;

    @Column({ type:'enum', enum:Order_Status, default:Order_Status.PACKING })
      status: Order_Status;

    @ManyToOne(() => User, (user) => user.orders)
      user: User;

    @CreateDateColumn()
      created_at: Date;

    @UpdateDateColumn()
      updated_at: Date;

}
