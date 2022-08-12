"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductEntity = void 0;
const cart_entity_1 = require("../../cart/entities/cart.entity");
const categories_entity_1 = require("../../categories/entities/categories.entity");
const category_product_entity_1 = require("./category-product.entity");
const images_entity_1 = require("../../common/entities/images.entity");
const order_product_entity_1 = require("./order-product.entity");
const typeorm_1 = require("typeorm");
let ProductEntity = class ProductEntity {
    id;
    title;
    price;
    descriptionSmall;
    descriptionFull;
    sold;
    quantity;
    cart;
    categories;
    images;
    categoryProduct;
    orderProduct;
    createdAt;
    updatedAt;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProductEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProductEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ProductEntity.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], ProductEntity.prototype, "descriptionSmall", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], ProductEntity.prototype, "descriptionFull", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ProductEntity.prototype, "sold", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ProductEntity.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cart_entity_1.CartEntity, (cart) => cart.products),
    __metadata("design:type", cart_entity_1.CartEntity)
], ProductEntity.prototype, "cart", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => categories_entity_1.CategoriesEntity, (cat) => cat.product),
    __metadata("design:type", Array)
], ProductEntity.prototype, "categories", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => images_entity_1.ImagesEntity, (image) => image.product),
    __metadata("design:type", Array)
], ProductEntity.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => category_product_entity_1.CategoryProductEntity, (catProd) => catProd.product),
    __metadata("design:type", Array)
], ProductEntity.prototype, "categoryProduct", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_product_entity_1.OrderProductEntity, (orderProd) => orderProd.product),
    __metadata("design:type", Array)
], ProductEntity.prototype, "orderProduct", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ProductEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ProductEntity.prototype, "updatedAt", void 0);
ProductEntity = __decorate([
    (0, typeorm_1.Entity)()
], ProductEntity);
exports.ProductEntity = ProductEntity;
//# sourceMappingURL=product.entity.js.map