import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ProductService } from './product.service.abstract';
import { ProductRepository } from '../repositories/product.repository';
import { CategoryProductRepository } from '../repositories/category-product.repository';
import { Like, Repository } from 'typeorm';

import type { ProductEntity } from '../entities/product.entity';
import type { UpdateResult, DeleteResult , DataSource } from 'typeorm';
import type { ProductDTO } from '../dto/product.dto';
import type { ProductUpdateDto } from '../dto/productUpdate.dto';
import type { CategoryProductEntity } from '../entities/category-product.entity';

@Injectable()
export class ProductServiceImpl extends ProductService {

  constructor(
    @Inject(ProductRepository)
    private readonly _productRepository: Repository<ProductEntity>,
    @Inject(CategoryProductRepository)
    private readonly _categoryProductsRepository: Repository<CategoryProductEntity>,
    private readonly _dataSource: DataSource,
  ) {
    super();
  }

  public override async createProduct(createProductDto: ProductDTO): Promise<void> {
    const categoryIds = createProductDto.categoryProducts;
    await this._dataSource.transaction(async (manager) => {
      const product = await manager.save(this._productRepository.create(createProductDto));
      await manager.save(this._categoryProductsRepository.create(
        categoryIds.map(categoryId => ({ product, category: { id: categoryId } })),
      ));
    });
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
    const products = this._productRepository.find({ relations: ['category'], where:{ id } });
    return products;
  }

  public override async searchProducts(str: string): Promise<ProductDTO[] | null> {
    const result = this._productRepository.findBy({
      title: Like(str),
    });
    return result;
  }

}
