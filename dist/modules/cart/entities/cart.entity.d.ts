import { ProductEntity } from '../../product/entities/product.entity';
export declare class CartEntity {
    id: number;
    products: ProductEntity[];
    createdAt: Date;
    updatedAt: Date;
}
