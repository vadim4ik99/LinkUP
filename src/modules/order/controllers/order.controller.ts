import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthUser, IAuthUser } from '../../../@framework/decorators/auth.decorator';
import { OrderControllerAbs } from './order.controller.abstract';
import { OrderService } from '../services/order.service.abstract';
import { JwtGuard } from '../../../@framework/guard/jwt.guard';
import { ChangeOrderStatusDTO } from '../dto/change-order.dto';
import { Authorization } from '../../../@framework/decorators/authorization.decorator';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import type { UpdateResult } from 'typeorm';
import type { OrderDTO } from '../dto/order.dto';

@ApiTags('Order controller')
@Controller('order')
export class OrderController extends OrderControllerAbs {

  constructor(private readonly _orderService: OrderService) {
    super();
  }

  @ApiCreatedResponse({ description: 'Created order Succesfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @UseGuards(JwtGuard)
  @Post('/')
  public override async order(@AuthUser() user: IAuthUser): Promise<void> {
    return this._orderService.order(user);
  }

  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiOkResponse({ description: 'The resource was returned successfully' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @UseGuards(JwtGuard)
  @Get('/all')
  public override async getAllOrders(
    @AuthUser() user: IAuthUser,
  ): Promise<OrderDTO[]> {
    return this._orderService.getAllOrders(user);
  }

  @ApiBody({ type: [ChangeOrderStatusDTO] })
  @ApiCreatedResponse({ description: 'Order status have been changed' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @Authorization(['vendor'])
  @UseGuards(JwtGuard)
  @Post('/change')
  public override async changeOrderStatus(@Body() payload: ChangeOrderStatusDTO ): Promise<UpdateResult> {
    return this._orderService.changeOrderStatus(payload.orderId, payload.status);
  }

}

