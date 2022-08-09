import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Order } from '../order/entities/order.entity';
import { CartController } from './controllers/cart.controller';
import { CartService } from './services/cart.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
