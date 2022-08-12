import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { CartController } from './controllers/cart.controller';
import { CartRepository } from './repositories/cart.repositories';
import { CartService } from './services/cart.service';

@Module({
  imports: [TypeOrmModule.forFeature([CartRepository])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
