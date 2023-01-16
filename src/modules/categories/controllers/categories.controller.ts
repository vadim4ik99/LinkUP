import { Body, Controller, Post } from '@nestjs/common';
import type { UpdateResult } from 'typeorm';
import { CategoriesImageDTO } from '../dto/categoriesImage.dto';
import { CategoriesService } from '../services/categories.service.abstract';
import { CategoriesControllerAbs } from './categories.controller.abstract';

@Controller('categories')
export class CategoriesController extends CategoriesControllerAbs {

  constructor(private readonly _categoryService: CategoriesService) {
    super();
  }

  @Post('/set-image')
  public override async setImageCategory(@Body() data: CategoriesImageDTO): Promise<Promise<UpdateResult>[]> {
    return await this._categoryService.setImageCategory(data);
  }

}
