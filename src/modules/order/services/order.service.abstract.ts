import type { IAuthUser } from 'src/@framework/decorators/auth.decorator';

export abstract class OrderService {

  public abstract order(user: IAuthUser): Promise<void>;

  public abstract getAllOrders(user: IAuthUser): Promise<void>;

  public abstract changeOrderStatus(orderId: number): Promise<void>;

}
