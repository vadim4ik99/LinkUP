import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthUser, IAuthUser } from '../../../@framework/decorators/auth.decorator';
import { OrderControllerAbs } from './order.controller.abstract';
import { OrderService } from '../services/order.service.abstract';
import { JwtGuard } from '../../../@framework/guard/jwt.guard';
import { IChangeOrderStatus } from '../interface/change-order.interface';
import { OrderDTO } from '../dto/order.dto';

import type { UpdateResult } from 'typeorm';

@Controller('order')
export class OrderController extends OrderControllerAbs {

  constructor(private readonly _orderService: OrderService) {
    super();
  }

  @UseGuards(JwtGuard)
  @Post()
  public override async order(@AuthUser() user: IAuthUser): Promise<void> {
    return this._orderService.order(user);
  }

  @UseGuards(JwtGuard)
  @Get()
  public override async getAllOrders(
    @AuthUser() user: IAuthUser,
  ): Promise<OrderDTO[]> {
    return this._orderService.getAllOrders(user);
  }

  @UseGuards(JwtGuard)
  @Post('/change')
  public override async changeOrderStatus(@Body() payload: IChangeOrderStatus ): Promise<UpdateResult> {
    return this._orderService.changeOrderStatus(payload.orderId, payload.status);
  }

}

