import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt } from 'class-validator';
import { OrderStatus } from '../entities/order.entity';

export class ChangeOrderStatusDTO {

  @ApiProperty()
  @IsInt()
  public orderId!: number;

  @ApiProperty()
  @IsEnum(OrderStatus)
  public status!: OrderStatus;

}
