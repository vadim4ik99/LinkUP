/* eslint-disable no-console */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseInterceptors,
  CacheInterceptor,
  CacheTTL,
} from '@nestjs/common';
import { ProductService } from '../services/product.service.abstract';
import { ProductControllerAbs } from './product.controller.abstract';
import { ProductUpdateDto } from '../dto/productUpdate.dto';
import { AuthUser, IAuthUser } from '../../../@framework/decorators/auth.decorator';
import { Authorization } from '../../../@framework/decorators/authorization.decorator';
import { CreateProductDTO } from '../dto/create-product.dto';
import { BySortEnum } from '../../../@framework/bysort.enum';
import { SetImagesToProductDTO } from '../dto/imagest-to-product.dto';
import { CommonService } from 'src/modules/common/services/common.service.abstract';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

import type { DeleteResult, UpdateResult } from 'typeorm';
import type { ProductDTO } from '../dto/product.dto';
import type { PaginationDTO } from '../dto/pagination-result.dto';

@ApiTags('Product controller')
@Controller('product')
export class ProductController extends ProductControllerAbs {

  constructor(
    private readonly _productServise: ProductService,
    private readonly _commonService: CommonService,
  ) {
    super();
  }

  @ApiBody({ type: [CreateProductDTO] })
  @ApiCreatedResponse({ description: 'Created Succesfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @Authorization(['vendor'])
  @Post('/add')
  public override async createProduct(
    @AuthUser() _user: IAuthUser,
    @Body() createProductDto: CreateProductDTO,
  ): Promise<void> {
    return this._productServise.createProduct(createProductDto);
  }

  @ApiBody({ type: [ProductUpdateDto] })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiOkResponse({ description: 'The resource was updated successfully' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @Authorization(['vendor'])
  @Put('/edit/:id')
  public override async editProduct(
    @AuthUser() _user: IAuthUser,
    @Param('id', ParseIntPipe) id: number,
    @Body() productUpdateDto: ProductUpdateDto,
  ): Promise<UpdateResult> {
    return this._productServise.editProduct(id, productUpdateDto);
  }

  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiOkResponse({ description: 'The resource was returned successfully' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @Authorization(['vendor'])
  @Delete('/delete/:id')
  public override async deleteProduct(
    @AuthUser() _user: IAuthUser,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteResult> {
    return this._productServise.deleteProduct(id);
  }

  @Get('/all')
  public override async getListProducts(
    @Query('ids') categoryIds: string = '',
    @Query('sort') sort: BySortEnum = BySortEnum.DESC,
    @Query('page') page: number = 1,
    @Query('take') take: number = 10,
  ): Promise<PaginationDTO> {
    return this._productServise.getListProducts(sort, page, take, categoryIds);
  }

  @ApiOkResponse({ description: 'The resource was returned successfully' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @Get('/search/')
  public override async searchProducts(@Query() str: string): Promise<ProductDTO[]> {
    return this._productServise.searchProducts(str);
  }

  @ApiOkResponse({ description: 'The resource was returned successfully' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @Get(':id')
  public override async getProduct(@Param('id', ParseIntPipe) id: number,
  ): Promise<ProductDTO | null> {
    return this._productServise.getProduct(id);
  }

  @ApiOkResponse({ description: 'The resource was returned successfully' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @UseInterceptors(CacheInterceptor)
  @Get('/')
  @CacheTTL(3000)
  public override async getAllProduct(
  ): Promise<ProductDTO[]> {
    return this._productServise.getAllProduct();
  }

  @UseInterceptors(CacheInterceptor)
  @ApiOkResponse({ description: 'The resource was returned successfully' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @Get('/category/:id')
  @CacheTTL(3000)
  public override async getProductListByCategory(@Param('id') id: string): Promise<ProductDTO[] | null> {
    return this._productServise.getProductListByCategory(+id);
  }

  @ApiBody({ type: [SetImagesToProductDTO] })
  @ApiOkResponse({ description: 'The resource was updated successfully' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @Put('/img/:id')
  public override async setImagesToProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: SetImagesToProductDTO,
  ): Promise<Promise<UpdateResult>[]> {
    return this._commonService.setImagesToProduct(id,data);
  }

}
