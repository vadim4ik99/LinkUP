import type { DeleteResult, UpdateResult } from 'typeorm';
import type { IAuthUser } from '../../../@framework/decorators/auth.decorator';
import type { CartDTO } from '../dto/cart.dto';
import { IAddItemToCart } from '../interface/additem.interface';

export abstract class CartControllerAbs {

  public abstract addItemToCart(
    payload: IAddItemToCart,
    user: IAuthUser,
  ): Promise<UpdateResult | CartDTO>;

  public abstract getCart(user: IAuthUser): Promise<CartDTO[]>;

  public abstract deleteCart(user: IAuthUser): Promise<DeleteResult>;

}
