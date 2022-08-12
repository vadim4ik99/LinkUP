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
exports.ImagesEntity = exports.ImageType = void 0;
const categories_entity_1 = require("../../categories/entities/categories.entity");
const product_entity_1 = require("../../product/entities/product.entity");
const typeorm_1 = require("typeorm");
var ImageType;
(function (ImageType) {
    ImageType["GIF"] = "gif";
    ImageType["JPEG"] = "jpeg";
    ImageType["PJPEG"] = "pjpeg";
    ImageType["PNG"] = "png";
    ImageType["SVG"] = "svg+xml";
    ImageType["TIFF"] = "tiff";
    ImageType["WEBP"] = "webp";
})(ImageType = exports.ImageType || (exports.ImageType = {}));
let ImagesEntity = class ImagesEntity {
    id;
    path;
    size;
    type;
    product;
    category;
    created_at;
    updated_at;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ImagesEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ImagesEntity.prototype, "path", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ImagesEntity.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ImageType }),
    __metadata("design:type", String)
], ImagesEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.ProductEntity, (product) => product.images),
    __metadata("design:type", product_entity_1.ProductEntity)
], ImagesEntity.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => categories_entity_1.CategoriesEntity, (category) => category.images),
    __metadata("design:type", categories_entity_1.CategoriesEntity)
], ImagesEntity.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ImagesEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ImagesEntity.prototype, "updated_at", void 0);
ImagesEntity = __decorate([
    (0, typeorm_1.Entity)()
], ImagesEntity);
exports.ImagesEntity = ImagesEntity;
//# sourceMappingURL=images.entity.js.map