/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn,
  OneToOne, JoinColumn } from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity';

@Entity()
export class Cart {

    @PrimaryGeneratedColumn()
      id: number;

    @OneToOne(()=> User)
    @JoinColumn()
      user_id: User;

    @CreateDateColumn()
      created_at: Date;

    @UpdateDateColumn()
      updated_at: Date;

}
