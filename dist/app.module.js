"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const user_entity_1 = require("./modules/user/entities/user.entity");
const cart_entity_1 = require("./modules/cart/entities/cart.entity");
const order_entity_1 = require("./modules/order/entities/order.entity");
const images_entity_1 = require("./modules/common/entities/images.entity");
const product_entity_1 = require("./modules/product/entities/product.entity");
const categories_entity_1 = require("./modules/categories/entities/categories.entity");
const category_product_entity_1 = require("./modules/product/entities/category-product.entity");
const order_product_entity_1 = require("./modules/product/entities/order-product.entity");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: ['.env', '.env.example'],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('HOST'),
                    port: +configService.get('DB_PORT'),
                    username: configService.get('DB_USER'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_NAME'),
                    entities: [user_entity_1.UserEntity, cart_entity_1.CartEntity, order_entity_1.OrderEntity, images_entity_1.ImagesEntity, product_entity_1.ProductEntity, categories_entity_1.CategoriesEntity,
                        category_product_entity_1.CategoryProductEntity, order_product_entity_1.OrderProductEntity],
                    synchronize: true,
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map