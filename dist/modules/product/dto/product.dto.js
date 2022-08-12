"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDTO = void 0;
class ProductDTO {
    title;
    price;
    description_small;
    description_full;
    sold;
    quantity;
    categories;
    img;
    constructor(title, price, description_small, description_full, sold, quantity, categories, img) {
        this.title = title;
        this.price = price;
        this.description_small = description_small;
        this.description_full = description_full;
        this.sold = sold;
        this.quantity = quantity;
        this.categories = categories;
        this.img = img;
    }
}
exports.ProductDTO = ProductDTO;
//# sourceMappingURL=product.dto.js.map