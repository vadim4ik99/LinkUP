import { Injectable } from '@nestjs/common';
import { OrderService } from './order.service.abstract';

@Injectable()
export class OrderServiceImpl extends OrderService {}
