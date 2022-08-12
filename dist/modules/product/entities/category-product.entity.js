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
exports.CategoryProductEntity = void 0;
const categories_entity_1 = require("../../categories/entities/categories.entity");
const product_entity_1 = require("./product.entity");
const typeorm_1 = require("typeorm");
let CategoryProductEntity = class CategoryProductEntity {
    id;
    product;
    category;
    created_at;
    updated_at;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CategoryProductEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.ProductEntity, (product) => product.categoryProduct),
    __metadata("design:type", product_entity_1.ProductEntity)
], CategoryProductEntity.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => categories_entity_1.CategoriesEntity, (category) => category.categoryProduct),
    __metadata("design:type", categories_entity_1.CategoriesEntity)
], CategoryProductEntity.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CategoryProductEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], CategoryProductEntity.prototype, "updated_at", void 0);
CategoryProductEntity = __decorate([
    (0, typeorm_1.Entity)()
], CategoryProductEntity);
exports.CategoryProductEntity = CategoryProductEntity;
//# sourceMappingURL=category-product.entity.js.map