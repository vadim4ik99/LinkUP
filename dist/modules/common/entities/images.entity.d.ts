import { CategoriesEntity } from 'src/modules/categories/entities/categories.entity';
import { ProductEntity } from 'src/modules/product/entities/product.entity';
export declare enum ImageType {
    GIF = "gif",
    JPEG = "jpeg",
    PJPEG = "pjpeg",
    PNG = "png",
    SVG = "svg+xml",
    TIFF = "tiff",
    WEBP = "webp"
}
export declare class ImagesEntity {
    id: number;
    path: string;
    size: string;
    type: ImageType;
    product: ProductEntity;
    category: CategoriesEntity;
    created_at: Date;
    updated_at: Date;
}
