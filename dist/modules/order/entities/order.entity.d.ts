import { OrderProductEntity } from '../../common/entities/order-product.entity';
import { UserEntity } from '../../user/entities/user.entity';
export declare enum OrderStatus {
    PAID = "paid",
    PACKING = "packing",
    SHIPPING = "shipping",
    DELIVERED = "deliverd"
}
export declare class OrderEntity {
    id: number;
    status: OrderStatus;
    user: UserEntity;
    orderProduct: OrderProductEntity[];
    createdAt: Date;
    updatedAt: Date;
}
