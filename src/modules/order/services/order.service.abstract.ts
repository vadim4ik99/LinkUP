import type { UpdateResult } from 'typeorm';
import type { OrderStatus } from '../entities/order.entity';
import type { OrderDTO } from '../dto/order.dto';
import type { IAuthUser } from '../../../@framework/decorators/auth.decorator';


export abstract class OrderService {

  public abstract order(user: IAuthUser): Promise<void>;

  public abstract getAllOrders(user: IAuthUser): Promise<OrderDTO[]>;

  public abstract changeOrderStatus(orderId: number, status: OrderStatus): Promise<UpdateResult>;

}
