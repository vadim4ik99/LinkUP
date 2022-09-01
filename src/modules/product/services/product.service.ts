import { Injectable } from '@nestjs/common';
import { ProductService } from './product.service.abstract';

@Injectable()
export class ProductServiceImpl extends ProductService {}
