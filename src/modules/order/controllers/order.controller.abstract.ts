import type { IAuthUser } from '../../../@framework/decorators/auth.decorator';
import type { UpdateResult } from 'typeorm';
import type { ChangeOrderStatusDTO } from '../dto/change-order.dto';
import type { OrderDTO } from '../dto/order.dto';

export abstract class OrderControllerAbs {

  public abstract order(user: IAuthUser): Promise<void>;

  public abstract getAllOrders(user: IAuthUser): Promise<OrderDTO[]> ;

  public abstract changeOrderStatus(payload: ChangeOrderStatusDTO): Promise<UpdateResult>;

}
