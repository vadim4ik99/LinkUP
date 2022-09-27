import { OrderDTO } from '../dto/order.dto';

import type { IAuthUser } from '../../../@framework/decorators/auth.decorator';
import type { UpdateResult } from 'typeorm';
import type { IChangeOrderStatus } from '../interface/change-order.interface';



export abstract class OrderControllerAbs {

  public abstract order(user: IAuthUser): Promise<void>;

  public abstract getAllOrders(user: IAuthUser): Promise<OrderDTO[]> ;

  public abstract changeOrderStatus(payload: IChangeOrderStatus): Promise<UpdateResult>;

}
