import { Module, CacheModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { ProductModule } from './modules/product/product.module';
import { UserModule } from './modules/user/user.module';
import { CartModule } from './modules/cart/cart.module';
import { OrderModule } from './modules/order/order.module';
import { CommonModule } from './modules/common/common.module';
import { CategoriesModule } from './modules/categories/categories.module';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.example'],
      isGlobal: true,
      cache: true,
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
        entities: [__dirname + '/**/*.{entity,view}.{ts,js}'],
        migrations : [__dirname + '/migrations/*.{ts,js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      url: 'redis://localhost:6379',
    }),
    { module: AuthModule, global: true },
    { module: ProductModule, global: true },
    { module: UserModule, global: true },
    { module: CartModule, global: true },
    { module: ProductModule, global: true },
    { module: OrderModule, global: true },
    { module: CommonModule, global: true },
    { module: CategoriesModule, global: true },
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
