import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CategoriesImageDTO } from '../dto/categoriesImage.dto';
import { CategoriesService } from '../services/categories.service.abstract';
import { CategoriesControllerAbs } from './categories.controller.abstract';

import type { UpdateResult } from 'typeorm';

@ApiTags('Category controller')
@Controller('categories')
export class CategoriesController extends CategoriesControllerAbs {

  constructor(private readonly _categoryService: CategoriesService) {
    super();
  }

  @ApiBody({ type: [CategoriesImageDTO] })
  @ApiCreatedResponse({ description: 'Images was Added to category Succesfully' })
  @Post('/set-image')
  public override async setImageCategory(@Body() data: CategoriesImageDTO): Promise<Promise<UpdateResult>[]> {
    return await this._categoryService.setImageCategory(data);
  }

}
