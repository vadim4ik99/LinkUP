import { Cart } from 'src/modules/cart/entities/cart.entity';
import { Images } from 'src/modules/common/entities/images.entity';
import { Order } from 'src/modules/order/entities/order.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn,
  OneToOne, JoinColumn, OneToMany  } from 'typeorm';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public first_name!: string;

  @Column()
  public last_name!: string;

  @Column()
  public verify!: boolean;

  @Column()
  public email!: string;

  @Column()
  public password!: string;

  @OneToOne(() => Cart )
  @JoinColumn()
  public cart!: Cart;

  @OneToOne(() => Images )
  @JoinColumn()
  public image!: Images;

  @OneToMany(() => Order, (order) => order.user)
  public orders!: Order[];

  @CreateDateColumn()
  public created_at!: Date;

  @UpdateDateColumn()
  public updated_at!: Date;

}
