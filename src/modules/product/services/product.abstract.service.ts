import type { CategoriesEntity } from 'src/modules/categories/entities/categories.entity';
import type { ImagesEntity } from 'src/modules/common/entities/images.entity';
import type { ProductEntity } from '../entities/product.entity';

export abstract class ProductAbstract {

  public abstract productList():Promise<ProductEntity[]>;
  public abstract createProduct(product:ProductEntity):Promise<ProductEntity>;
  public abstract getProduct(id: string):Promise<ProductEntity>;
  public abstract updateProduct(id: string):Promise<ProductEntity>;
  public abstract deleteProduct(id: string):Promise<void>;
  public abstract getImageProduct(id: string):Promise<ImagesEntity[]>;
  public abstract getCategoryProduct(id: string):Promise<CategoriesEntity[]>;

}
