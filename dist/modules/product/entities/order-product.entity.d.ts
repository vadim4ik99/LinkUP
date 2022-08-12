import { OrderEntity } from 'src/modules/order/entities/order.entity';
import { ProductEntity } from 'src/modules/product/entities/product.entity';
export declare class OrderProductEntity {
    id: number;
    cost: number;
    quantity: number;
    product: ProductEntity;
    order: OrderEntity;
    created_at: Date;
    updated_at: Date;
}
