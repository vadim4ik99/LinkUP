import { User } from 'src/modules/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

export enum OrderStatus {
    PAID = "paid",
    PACKING = "packing",
    SHIPPING = "shipping",
    DELIVERED = "deliverd"
}

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
      id: number;

    @Column({type: "enum", enum: OrderStatus, default: OrderStatus.PACKING})
    status: OrderStatus;

    @ManyToOne(() => User, (user) => user.orders)
    user: User;

    @CreateDateColumn()
      created_at: Date;

    @UpdateDateColumn()
      updated_at: Date;
}