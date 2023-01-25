import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '../entities/order.entity';

export class OrderDTO {

  @ApiProperty()
  public id!: number;

  @ApiProperty()
  public userId!: number;

  @ApiProperty()
  public status!: OrderStatus;

}
