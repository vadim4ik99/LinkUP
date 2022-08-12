import type { CategoriesEntity } from 'src/modules/categories/entities/categories.entity';
import type { ImagesEntity } from 'src/modules/common/entities/images.entity';
import type { ProductEntity } from '../entities/product.entity';
export declare abstract class ProductAbstract {
    abstract productList(): Promise<ProductEntity[]>;
    abstract createProduct(product: ProductEntity): Promise<ProductEntity>;
    abstract getProduct(id: string): Promise<ProductEntity>;
    abstract updateProduct(id: string): Promise<ProductEntity>;
    abstract deleteProduct(id: string): Promise<void>;
    abstract getImageProduct(id: string): Promise<ImagesEntity[]>;
    abstract getCategoryProduct(id: string): Promise<CategoriesEntity[]>;
}
