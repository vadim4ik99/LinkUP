import type { DeleteResult } from 'typeorm';
import type { IAuthUser } from '../../../@framework/decorators/auth.decorator';
import type { ProductDTO } from '../../product/dto/product.dto';
import type { CartDTO, CartUpdateProductDTO } from '../dto/cart.dto';

export abstract class CartControllerAbs {

  public abstract addItemToCart(
    productId: ProductDTO,
    user: IAuthUser,
    quantity: number,
  ): Promise<CartUpdateProductDTO>;

  public abstract getCart(user: IAuthUser): Promise<CartDTO[]>;

  public abstract deleteCart(user: IAuthUser): Promise<DeleteResult>;

}
