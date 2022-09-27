import type { OrderStatus } from '../entities/order.entity';

export interface IChangeOrderStatus {
  orderId: number;
  status: OrderStatus;
}
