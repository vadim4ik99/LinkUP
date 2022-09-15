import type { IAuthUser } from '../../../@framework/decorators/auth.decorator';
import type { DeleteResult, UpdateResult } from 'typeorm';
import type { ProductDTO } from '../dto/product.dto';
import type { ProductUpdateDto } from '../dto/productUpdate.dto';
import type { ProductEntity } from '../entities/product.entity';

export abstract class ProductControllerAbs {

    public abstract createProduct(_user: IAuthUser, createProductDto: ProductDTO): Promise<ProductDTO>;

    public abstract editProduct(
        _user: IAuthUser,
        id: number,
        productUpdateDto: ProductUpdateDto
    ): Promise<UpdateResult>;

    public abstract deleteProduct(_user: IAuthUser, id: number): Promise<DeleteResult>;

    public abstract getProduct(id: number): Promise<ProductEntity | null>;

}
