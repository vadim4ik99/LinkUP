import type { IAuthUser } from '../../../@framework/decorators/auth.decorator';
import type { ProductDTO } from '../../product/dto/product.dto';
import type { DeleteResult, UpdateResult } from 'typeorm';
import type { CartDTO } from '../dto/cart.dto';
import type { CartEntity } from '../entities/cart.entity';

export abstract class CartService {

    public abstract addItemToCart(
        productId: ProductDTO,
        user: IAuthUser,
        quantity: number,
    ): Promise<UpdateResult | null>;

    public abstract getCart(user: IAuthUser): Promise<CartDTO[]>;

    public abstract deleteCart(user: IAuthUser): Promise<DeleteResult>;

    public abstract hasProduct(productId: number, user: IAuthUser): Promise<boolean>;

    public abstract getItemsInCard(user: IAuthUser): Promise<CartEntity[]>;

}
