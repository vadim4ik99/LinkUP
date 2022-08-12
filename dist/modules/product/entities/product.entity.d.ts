import { CartEntity } from '../../cart/entities/cart.entity';
import { CategoriesEntity } from '../../categories/entities/categories.entity';
import { CategoryProductEntity } from './category-product.entity';
import { ImagesEntity } from '../../common/entities/images.entity';
import { OrderProductEntity } from './order-product.entity';
export declare class ProductEntity {
    id: number;
    title: string;
    price: number;
    descriptionSmall: string;
    descriptionFull: string;
    sold: number;
    quantity: number;
    cart: CartEntity;
    categories: CategoriesEntity[];
    images: ImagesEntity[];
    categoryProduct: CategoryProductEntity[];
    orderProduct: OrderProductEntity[];
    createdAt: Date;
    updatedAt: Date;
}
