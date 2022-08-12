import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserEntity } from './modules/user/entities/user.entity';
import { CartEntity } from './modules/cart/entities/cart.entity';
import { OrderEntity } from './modules/order/entities/order.entity';
import { ImagesEntity } from './modules/common/entities/images.entity';
import { ProductEntity } from './modules/product/entities/product.entity';
import { CategoriesEntity } from './modules/categories/entities/categories.entity';
import { CategoryProductEntity } from './modules/product/entities/category-product.entity';
import { OrderProductEntity } from './modules/product/entities/order-product.entity';

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
        entities: [UserEntity, CartEntity, OrderEntity, ImagesEntity, ProductEntity, CategoriesEntity,
          CategoryProductEntity, OrderProductEntity],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
