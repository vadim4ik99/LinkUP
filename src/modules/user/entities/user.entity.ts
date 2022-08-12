import { CartEntity } from 'src/modules/cart/entities/cart.entity';
import { ImagesEntity } from 'src/modules/common/entities/images.entity';
import { OrderEntity } from 'src/modules/order/entities/order.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn,
  OneToOne, JoinColumn, OneToMany  } from 'typeorm';

@Entity()
export class UserEntity {

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

  @OneToOne(() => CartEntity )
  @JoinColumn()
  public cart!: CartEntity;

  @OneToOne(() => ImagesEntity )
  @JoinColumn()
  public image!: ImagesEntity;

  @OneToMany(() => OrderEntity, (order) => order.user)
  public orders!: OrderEntity[];

  @CreateDateColumn()
  public created_at!: Date;

  @UpdateDateColumn()
  public updated_at!: Date;

}
