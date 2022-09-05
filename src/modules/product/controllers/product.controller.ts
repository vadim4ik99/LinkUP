import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ProductDTO } from '../dto/product.dto';
import { ProductService } from '../services/product.service.abstract';
import { ProductControllerAbs } from './product.controller.abstract';
import { ProductUpdateDto } from '../dto/productUpdate.dto';
import { AuthUser, IAuthUser } from '../../auth/decorators/auth.decorator';

import type { UpdateResult, DeleteResult } from 'typeorm';
import type { ProductEntity } from '../entities/product.entity';

@Controller('product')
export class ProductController extends ProductControllerAbs {

  constructor(private readonly _productServise: ProductService) {
    super();
  }

  @Post('/add')
  public override async createProduct(@AuthUser() _user: IAuthUser, createProductDto: ProductDTO,
  ): Promise<ProductEntity> {
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
  ): Promise<ProductEntity | null> {
    return this._productServise.getProduct(id);
  }

}
