import { Cart } from 'src/modules/cart/entities/cart.entity';
import { Images } from 'src/modules/common/entities/images.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn,
  OneToOne, JoinColumn  } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
      id: number;

    @Column()
      first_name: string;

    @Column()
      last_name: string;   

    @Column()
      verify: boolean;

    @Column()
      email: string;

    @Column()
      password: string;

    @OneToOne(() => Cart )
    @JoinColumn()
    cart: Cart;

    @OneToOne(() => Images )
    @JoinColumn()
    image: Images;

    @CreateDateColumn()
      created_at: Date;

    @UpdateDateColumn()
      updated_at: Date;

}
