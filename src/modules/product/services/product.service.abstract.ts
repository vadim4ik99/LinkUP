import type { UpdateResult, DeleteResult } from 'typeorm';
import type { ProductDTO } from '../dto/product.dto';
import type { ProductUpdateDto } from '../dto/productUpdate.dto';

export abstract class ProductService {

    public abstract createProduct(createProductDto: ProductDTO): Promise<ProductDTO>;

    public abstract editProduct(id: number,  productUpdateDto: ProductUpdateDto): Promise<UpdateResult>;

    public abstract deleteProduct(id: number): Promise<DeleteResult>;

    public abstract getProduct(id: number): Promise<ProductDTO | null>;

    public abstract getProductListByCategory(id: number): Promise<ProductDTO[] | null>;

    public abstract searchProducts(str: string): Promise<ProductDTO[] | null>;

}
