import { IsEnum, IsInt } from 'class-validator';
import { OrderStatus } from '../entities/order.entity';

export class ChangeOrderStatusDTO {

  @IsInt()
  public orderId!: number;

  @IsEnum(OrderStatus)
  public status!: OrderStatus;

}
