import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { ProductController } from './controllers/product.controller';
import { ProductEntity } from './entities/product.entity';
import { ProductRepository, productRepositoryFactory } from './repositories/product.repository';
import { ProductServiceImpl } from './services/product.service';
import { ProductService } from './services/product.service.abstract';

const productRepository = {
  provide: ProductRepository,
  inject: ['DATA_SOURCE'],
  useFactory: productRepositoryFactory,
};

const productService = { provide: ProductService, useClass: ProductServiceImpl };

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductController],
  providers: [productService, productRepository],
})
export class ProductModule {}
