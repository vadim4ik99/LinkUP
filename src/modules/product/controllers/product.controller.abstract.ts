import type { IAuthUser } from '../../../@framework/decorators/auth.decorator';
import type { DeleteResult, UpdateResult } from 'typeorm';
import type { ProductUpdateDto } from '../dto/productUpdate.dto';
import type { CreateProductDTO } from '../dto/create-product.dto';
import type { ProductDTO } from '../dto/product.dto';
import type { PaginationDTO } from '../dto/pagination-result.dto';
import { BySortEnum } from 'src/@framework/bysort.enum';

export abstract class ProductControllerAbs {

    public abstract createProduct(_user: IAuthUser, createProductDto: CreateProductDTO): Promise<void>;

    public abstract editProduct(
        _user: IAuthUser,
        id: number,
        productUpdateDto: ProductUpdateDto
    ): Promise<UpdateResult>;

    public abstract deleteProduct(_user: IAuthUser, id: number): Promise<DeleteResult>;

    public abstract getProduct(id: number): Promise<ProductDTO | null>;

    public abstract getAllProduct(): Promise<ProductDTO[]>;

    public abstract searchProducts(str: string): Promise<ProductDTO[]>;

    public abstract getProductListByCategory(id: string): Promise<ProductDTO[] | null>;

    public abstract pagination(sort: BySortEnum, page: number): Promise<PaginationDTO>;

}
