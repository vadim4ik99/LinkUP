import { CategoriesEntity } from '../../categories/entities/categories.entity';
import { ProductEntity } from './product.entity';
export declare class CategoryProductEntity {
    id: number;
    product: ProductEntity;
    category: CategoriesEntity;
    created_at: Date;
    updated_at: Date;
}
