import { CartEntity } from 'src/modules/cart/entities/cart.entity';
import { ImagesEntity } from 'src/modules/common/entities/images.entity';
import { OrderEntity } from 'src/modules/order/entities/order.entity';
export declare class UserEntity {
    id: number;
    first_name: string;
    last_name: string;
    verify: boolean;
    email: string;
    password: string;
    cart: CartEntity;
    image: ImagesEntity;
    orders: OrderEntity[];
    created_at: Date;
    updated_at: Date;
}
