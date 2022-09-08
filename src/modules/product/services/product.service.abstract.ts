import type { UpdateResult, DeleteResult } from 'typeorm';
import type { ProductDTO } from '../dto/product.dto';
import type { ProductUpdateDto } from '../dto/productUpdate.dto';
import type { ProductEntity } from '../entities/product.entity';

export abstract class ProductService {

    public abstract createProduct(createProductDto: ProductDTO): Promise<ProductDTO>;

    public abstract editProduct(id: number,  productUpdateDto: ProductUpdateDto): Promise<UpdateResult>;

    public abstract deleteProduct(id: number): Promise<DeleteResult>;

    public abstract getProduct(id: number): Promise<ProductEntity | null>;

}
