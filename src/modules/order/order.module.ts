import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CartModule } from '../cart/cart.module';
import { UserModule } from '../user/user.module';
import { OrderController } from './controllers/order.controller';
import { OrderEntity } from './entities/order.entity';
import {
  OrderRepository,
  orderRepositoryFactory,
} from './repositories/order.repositories';
import { OrderServiceImpl } from './services/order.service';
import { OrderService } from './services/order.service.abstract';

const orderRepository = {
  provide: OrderRepository,
  inject: [DataSource],
  useFactory: orderRepositoryFactory,
};

const orderService = { provide: OrderService, useClass: OrderServiceImpl };

@Module({
  imports: [
    UserModule,
    CartModule,
    TypeOrmModule.forFeature([OrderEntity])
  ],
  controllers: [OrderController],
  providers: [orderService, orderRepository],
})
export class OrderModule {}
