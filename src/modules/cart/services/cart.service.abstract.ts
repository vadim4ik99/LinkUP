import type { IAuthUser } from '../../../@framework/decorators/auth.decorator';
import type { ProductDTO } from '../../product/dto/product.dto';
import type { DeleteResult } from 'typeorm';
import type { CartDTO } from '../dto/cart.dto';

export abstract class CartService {

    public abstract addItemToCart(productId: ProductDTO, user: IAuthUser): Promise<CartDTO>;

    public abstract getCart(user: IAuthUser): Promise<CartDTO>;

    public abstract deleteCart(user: IAuthUser): Promise<DeleteResult>;

    public abstract removeItemFromCart(productId: ProductDTO, user: IAuthUser): Promise<CartDTO>;

}
