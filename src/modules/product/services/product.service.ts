import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ProductService } from './product.service.abstract';
import { ProductRepository } from '../repositories/product.repository';
import { CategoryProductRepository } from '../repositories/category-product.repository';
import { Like, Repository , DataSource, UpdateResult } from 'typeorm';

import type { ProductEntity } from '../entities/product.entity';
import type { DeleteResult  } from 'typeorm';
import type { ProductDTO } from '../dto/product.dto';
import type { ProductUpdateDto } from '../dto/productUpdate.dto';
import type { CategoryProductEntity } from '../entities/category-product.entity';
import type { CreateProductDTO } from '../dto/create-product.dto';

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

  public override async createProduct(createProductDto: CreateProductDTO): Promise<void> {
    const { title, price, descriptionSmall, descriptionFull, quantity, categoryIds } = createProductDto;
    await this._dataSource.transaction(async (manager) => {
      const product = await manager.save(this._productRepository.create({
        title,
        price,
        descriptionSmall,
        descriptionFull,
        quantity,
      }),
      );
      await manager.save(this._categoryProductsRepository.create(
        categoryIds.map(categoryId => ({ product, category: { id: +categoryId } })),
      ));
    });
  }

  public override async editProduct(id: number, productUpdateDto: ProductUpdateDto): Promise<UpdateResult> {
    const {categoryIds, ...other } = productUpdateDto;
    const product = await this.getProduct(id);
    const categoryProducts = await this._categoryProductsRepository.find({
      where: { product: { id: id } }, relations: ['category'] });
    const arrIds = categoryProducts.map(categoryId =>(categoryId.categoryId));
    const inputIds = categoryIds.map(item => +item);
    if(inputIds == arrIds) {return this._productRepository.update({ id: product?.id }, { ...other})}
    else {
      arrIds.forEach(element => {
        this._categoryProductsRepository.delete({ id: element })  
      });
      const productUpdate = await this._productRepository.update({ id: product?.id }, { ...other});
      const result = await this._categoryProductsRepository.create(
        categoryIds.map(categoryId => ({ productUpdate, category: { id: +categoryId } })));
      await this._categoryProductsRepository.save(result);
      return productUpdate;
    }
    
 }

  public override async deleteProduct(id: number): Promise<DeleteResult> {
    const categoryProducts = await this._categoryProductsRepository.find({
      where: { product: { id: id } }, relations: ['category'] });
    await this._categoryProductsRepository.remove(categoryProducts);
    return this._productRepository.delete({ id });
  }

  public override async getProduct(id: number): Promise<ProductDTO | null> {
    const product = await this._productRepository.findOne({
      where: { id: id }, relations: ['categoryProducts'] });
    if (!product) { throw new BadRequestException('Can`t find product with this id');}
    return product;
  }

  public override async getProductListByCategory(id: number): Promise<ProductDTO[] | null> {
    const categoryProducts = await this._categoryProductsRepository.find({
      where: { category: { id: id } }, relations: ['product'] });
    const result = categoryProducts.map(item => (item.product));
    return result;
  }

  public override async searchProducts(str: string): Promise<ProductDTO[] | null> {
    const result = await this._productRepository.findBy({
      title: Like(`%${str}%`), //don`t work
    });
    return result;
  }

  public override async getAllProduct(): Promise<ProductDTO[]> {
    const products = this._productRepository.find();
    return products;
  }

}
