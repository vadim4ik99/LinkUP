import { CategoryProductEntity } from '../../product/entities/category-product.entity';
import { ImagesEntity } from '../../common/entities/images.entity';
import { ProductEntity } from '../../product/entities/product.entity';
export declare class CategoriesEntity {
    id: number;
    name: string;
    product: ProductEntity;
    images: ImagesEntity[];
    categoryProduct: CategoryProductEntity[];
    createdAat: Date;
    updatedAt: Date;
}
