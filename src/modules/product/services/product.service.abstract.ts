import type { DeleteResult, UpdateResult } from 'typeorm';
import type { CreateProductDTO } from '../dto/create-product.dto';
import type { ProductOutDTO } from '../dto/product-output.dto';
import type { ProductDTO } from '../dto/product.dto';
import type { ProductUpdateDto } from '../dto/productUpdate.dto';

export abstract class ProductService {

    public abstract createProduct(createProductDto: CreateProductDTO): Promise<void>;

    public abstract editProduct(id: number,  productUpdateDto: ProductUpdateDto): Promise<UpdateResult>;

    public abstract deleteProduct(id: number): Promise<DeleteResult>;

    public abstract getProduct(id: number): Promise<ProductOutDTO | null>;

    public abstract getProductListByCategory(id: number): Promise<ProductDTO[] | null>;

    public abstract searchProducts(str: string): Promise<ProductDTO[]>;

    public abstract getAllProduct(): Promise<ProductDTO[]>

}
