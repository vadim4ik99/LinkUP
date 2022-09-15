import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ProductService } from './product.service.abstract';
import { ProductRepository } from '../repositories/product.repository';
import { Like, Repository } from 'typeorm';

import type { ProductEntity } from '../entities/product.entity';
import type { UpdateResult, DeleteResult } from 'typeorm';
import type { ProductDTO } from '../dto/product.dto';
import type { ProductUpdateDto } from '../dto/productUpdate.dto';

@Injectable()
export class ProductServiceImpl extends ProductService {

  constructor(
    @Inject(ProductRepository)
    private readonly _productRepository: Repository<ProductEntity>) {
    super();
  }

  public override async createProduct(createProductDto: ProductDTO): Promise<ProductDTO> {
    return this._productRepository.save(createProductDto);
  }

  public override async editProduct(id: number, productUpdateDto: ProductUpdateDto): Promise<UpdateResult> {
    const product = await this.getProduct(id);
    return this._productRepository.update({ id: product?.id }, { ...productUpdateDto });
  }

  public override async deleteProduct(id: number): Promise<DeleteResult> {
    return this._productRepository.delete({ id });
  }

  public override async getProduct(id: number): Promise<ProductDTO | null> {
    const product = this._productRepository.findOneBy({ id });
    if (!product) { throw new BadRequestException('Can`t find product with this id');}
    return product;
  }

  public override async getProductListByCategory(id: number): Promise<ProductDTO[] | null> {
    const category = this._productRepository.find({ relations: ['category'], where:{ id } });
    return category;
  }

  public override async searchProducts(str: string): Promise<ProductDTO[] | null> {
    const result = this._productRepository.findBy({
      title: Like(str),
    });
    return result;
  }

}
