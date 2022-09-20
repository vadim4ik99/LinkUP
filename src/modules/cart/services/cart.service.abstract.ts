import type { IAuthUser } from '../../../@framework/decorators/auth.decorator';
import type { ProductDTO } from '../../product/dto/product.dto';
import type { DeleteResult } from 'typeorm';
import type { CartDTO, CartUpdateProductDTO } from '../dto/cart.dto';

export abstract class CartService {

  public abstract addItemToCart(
    productId: ProductDTO,
    user: IAuthUser,
    quantity: number,
  ): Promise<CartUpdateProductDTO>;

  public abstract getCartsByUser(user: IAuthUser): Promise<CartDTO[]>;

  public abstract deleteCart(user: IAuthUser): Promise<DeleteResult>;

  public abstract hasProduct(productId: number, user: IAuthUser): Promise<boolean>;

}
