import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { OrderStatus } from '../entities/order.entity';

export class OrderDTO {

  @IsInt()
  @IsNotEmpty()
  public id!: number;

  @IsString()
  public user_id!: string;

  @IsEnum(OrderStatus)
  public status!: OrderStatus;

}
