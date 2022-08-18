import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartController } from './controllers/cart.controller';
import { CartEntity } from './entities/cart.entity';
import { CartRepository, cartRepositoryFactory } from './repositories/cart.repository';
import { CartServiceImpl } from './services/cart.service';
import { CartService } from './services/cart.service.abstract';

const cartRepository = {
  provide: CartRepository,
  inject: ['DATA_SOURCE'],
  useFactory: cartRepositoryFactory,
};

const cartService = { provide: CartService, useClass: CartServiceImpl };

@Module({
  imports: [TypeOrmModule.forFeature([CartEntity])],
  controllers: [CartController],
  providers: [cartService, cartRepository],
})
export class CartModule {}
