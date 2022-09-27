import type { IAuthUser } from '../../../@framework/decorators/auth.decorator';
import type { UpdateResult } from 'typeorm';
import type { CartDTO } from '../dto/cart.dto';

export abstract class CartService {

  public abstract addItemToCart(
    productId: number,
    user: IAuthUser,
    quantity: number,
  ): Promise<UpdateResult | CartDTO>;

  public abstract getCartsByUser(user: IAuthUser): Promise<CartDTO[]>;

  public abstract deleteCart(user: IAuthUser): Promise<CartDTO[]>;

  public abstract hasProduct(productId: number, user: IAuthUser): Promise<boolean>;

  public abstract getItemsInCard(user: IAuthUser): Promise<number[]>;

}
