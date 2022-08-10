import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './modules/user/entities/user.entity';
import { Cart } from './modules/cart/entities/cart.entity';
import { Order } from './modules/order/entities/order.entity';
import { Images } from './modules/common/entities/images.entity';
import { Product } from './modules/product/entities/product.entity';
import { Categories } from './modules/categories/entities/categories.entity';
import { CategoryProduct } from './modules/common/entities/category-product.entity';
import { OrderProduct } from './modules/common/entities/order-product.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.example'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [User, Cart, Order, Images, Product, Categories, CategoryProduct, OrderProduct],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
