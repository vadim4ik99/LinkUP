import { Injectable } from '@nestjs/common';
import { CartService } from './cart.service.abstract';

@Injectable()
export class CartServiceImpl extends CartService {

}
