import type { IAuthUser } from '../../../@framework/decorators/auth.decorator';
import type { ProductDTO } from '../../product/dto/product.dto';
import type { CartDTO } from '../dto/cart.dto';

export abstract class CartControllerAbs {

    public abstract addItemToCart(productId: ProductDTO, user: IAuthUser): Promise<CartDTO>;

    public abstract removeItemFromCart(productId: string, user: IAuthUser): Promise<CartDTO>;

    public abstract getCart(user: IAuthUser): Promise<CartDTO>;

    public abstract deleteCart(user: IAuthUser): Promise<void>;

}
