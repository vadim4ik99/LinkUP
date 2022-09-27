import type { UpdateResult } from 'typeorm';
import type { IAuthUser } from '../../../@framework/decorators/auth.decorator';
import type { CartDTO } from '../dto/cart.dto';
import type { AddItemToCartDTO } from '../dto/additem.dto';

export abstract class CartControllerAbs {

  public abstract addItemToCart(
    payload: AddItemToCartDTO,
    user: IAuthUser,
  ): Promise<UpdateResult | CartDTO>;

  public abstract getCart(user: IAuthUser): Promise<CartDTO[]>;

  public abstract deleteCart(user: IAuthUser): Promise<void>;

}
