import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ProductController } from './controllers/product.controller';
import { CategoryProductEntity } from './entities/category-product.entity';
import { OrderProductEntity } from './entities/order-product.entity';
import { ProductEntity } from './entities/product.entity';
import {
  CategoryProductRepository,
  categoryProductRepositoryFactory,
} from './repositories/category-product.repository';
import {
  OrderProductRepository,
  orderProductRepositoryFactory,
} from './repositories/order-product.repository';
import {
  ProductRepository,
  productRepositoryFactory,
} from './repositories/product.repository';
import { ProductServiceImpl } from './services/product.service';
import { ProductService } from './services/product.service.abstract';

const productRepository = {
  provide: ProductRepository,
  inject: [DataSource],
  useFactory: productRepositoryFactory,
};

const categoryProductRepository = {
  provide: CategoryProductRepository,
  inject: [DataSource],
  useFactory: categoryProductRepositoryFactory,
};

const orderProductRepository = {
  provide: OrderProductRepository,
  inject: [DataSource],
  useFactory: orderProductRepositoryFactory,
};

const productService = {
  provide: ProductService,
  useClass: ProductServiceImpl,
};

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      CategoryProductEntity,
      OrderProductEntity,
    ]),
  ],
  controllers: [ProductController],
  providers: [
    productService,
    productRepository,
    categoryProductRepository,
    orderProductRepository,
  ],
  exports: [
    productService,
    productRepository,
    categoryProductRepository,
    orderProductRepository]
})
export class ProductModule {}
