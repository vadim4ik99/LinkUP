import type { OrderStatus } from '../entities/order.entity';

export class OrderDTO {

  public id!: number;

  public userId!: number;

  public status!: OrderStatus;

}
