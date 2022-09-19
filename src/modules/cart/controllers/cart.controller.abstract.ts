import type { DeleteResult, UpdateResult } from 'typeorm';
import type { IAuthUser } from '../../../@framework/decorators/auth.decorator';
import type { ProductDTO } from '../../product/dto/product.dto';
import type { CartDTO } from '../dto/cart.dto';

export abstract class CartControllerAbs {

    public abstract addItemToCart(
        productId: ProductDTO,
        user: IAuthUser,
        quantity: number,
    ): Promise<UpdateResult | null>;

    public abstract getCart(user: IAuthUser): Promise<CartDTO[]>;

    public abstract deleteCart(user: IAuthUser): Promise<DeleteResult>;

}
