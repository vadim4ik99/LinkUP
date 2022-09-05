import { CartEntity } from '../../cart/entities/cart.entity';
import { FileEntity } from '../../common/entities/images.entity';
import { OrderEntity } from '../../order/entities/order.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { RoleEnum } from '../../auth/role.enum';

@Entity()
export class UserEntity {

  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ nullable: true })
  public firstName?: string;

  @Column({ nullable: true })
  public lastName?: string;

  @Column({ default: false })
  public verify?: boolean;

  @Column()
  public email!: string;

  @Column()
  public password!: string;

  @Column({ type: 'enum', enum: RoleEnum, default: RoleEnum.Costumer })
  public role!: RoleEnum;

  @OneToMany(() => CartEntity, (cart) => cart.user)
  public carts?: CartEntity[];

  @ManyToOne(() => FileEntity, (avatar) => avatar.users)
  public avatar?: FileEntity;

  @RelationId((user: UserEntity) => user.avatar)
  public avatarId?: number;

  @OneToMany(() => OrderEntity, (order) => order.user)
  public orders?: OrderEntity[];

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;

}
