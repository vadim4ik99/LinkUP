import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ProductModule } from '../product/product.module';
import { CartController } from './controllers/cart.controller';
import { CartEntity } from './entities/cart.entity';
import {
  CartRepository,
  cartRepositoryFactory,
} from './repositories/cart.repository';
import { CartServiceImpl } from './services/cart.service';
import { CartService } from './services/cart.service.abstract';

const cartRepository = {
  provide: CartRepository,
  inject: [DataSource],
  useFactory: cartRepositoryFactory,
};

const cartService = { provide: CartService, useClass: CartServiceImpl };

@Module({
  imports: [
    ProductModule,
    TypeOrmModule.forFeature([CartEntity])
  ],
  controllers: [CartController],
  providers: [cartService, cartRepository],
  exports: [cartService],
})
export class CartModule {}
