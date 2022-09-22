import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ProductService } from '../services/product.service.abstract';
import { ProductControllerAbs } from './product.controller.abstract';
import { ProductUpdateDto } from '../dto/productUpdate.dto';
import { AuthUser, IAuthUser } from '../../../@framework/decorators/auth.decorator';
import { Authorization } from '../../../@framework/decorators/authorization.decorator';
import { CreateProductDTO } from '../dto/create-product.dto';

import type { UpdateResult, DeleteResult } from 'typeorm';
import type { ProductDTO } from '../dto/product.dto';

@Controller('product')
export class ProductController extends ProductControllerAbs {

  constructor(private readonly _productServise: ProductService) {
    super();
  }

  @Authorization(['vendor'])
  @Post('/add')
  public override async createProduct(
    @AuthUser() _user: IAuthUser,
    @Body()createProductDto: CreateProductDTO,
  ): Promise<void> {
    return this._productServise.createProduct(createProductDto);
  }

  @Put('/edit:id')
  public override async editProduct(
    @AuthUser() _user: IAuthUser,
    @Param('id', ParseIntPipe) id: number,
    @Body() productUpdateDto: ProductUpdateDto,
  ): Promise<UpdateResult> {
    return this._productServise.editProduct(id, productUpdateDto);
  }

  @Delete('/delete:id')
  public override async deleteProduct(
    @AuthUser() _user: IAuthUser,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteResult> {
    return this._productServise.deleteProduct(id);
  }

  @Get(':id')
  public override async getProduct(@Param('id', ParseIntPipe) id: number,
  ): Promise<ProductDTO | null> {
    return this._productServise.getProduct(id);
  }

}
