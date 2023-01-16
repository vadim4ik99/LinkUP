/* eslint-disable no-console */
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CategoryRepository } from '../repositories/categories.repository';
import { CategoriesService } from './categories.service.abstract';
import { CategoriesOutputDTO } from '../dto/categories.dto';
import * as fs from 'fs';

import type { CategoriesUpdateDTO , CategoriesInputDTO } from '../dto/categories.dto';
import type { CategoriesEntity } from '../entities/categories.entity';
import type { UpdateResult, DeleteResult } from 'typeorm';
import type { CategoriesImageDTO } from '../dto/categoriesImage.dto';
import { CommonService } from 'src/modules/common/services/common.service.abstract';

@Injectable()
export class CategoriesServiceImpl extends CategoriesService {

  constructor(
    @Inject(CategoryRepository)
    private readonly _categoryRepository: Repository<CategoriesEntity>,
    private readonly _commonService : CommonService,
  ) {
    super();
  }

  public override async createCategory(createCategoryDto: CategoriesInputDTO): Promise<CategoriesOutputDTO> {
    return this._categoryRepository.save(createCategoryDto);
  }

  public override async editCategoryById(id: number,  categoryUpdateDto: CategoriesUpdateDTO): Promise<UpdateResult> {
    const category = await this.getCategoryById(id);
    if(!category) {throw new NotFoundException();}
    return this._categoryRepository.update({ id: category?.id }, { ...categoryUpdateDto });
  }

  public override async deleteCategoryById(id: number): Promise<DeleteResult> {
    return this._categoryRepository.delete({ id });
  }

  public override async getCategoryById(id: number): Promise<CategoriesOutputDTO> {
    const category = await this._categoryRepository.findOne({ where: { id }, relations: ['images'] });
    if (!category) { throw new NotFoundException('Can`t find category');}
    return new CategoriesOutputDTO(category);
  }

  public override async setImageCategory(data: CategoriesImageDTO): Promise<Promise<UpdateResult>[]> {
    const filePath = './uploads/' + data.filename;
    if(!fs.existsSync(filePath)) {
      throw new NotFoundException('No such file');
    }
    const files = await this._commonService.getImageByName(filePath);
    if(!files) { throw new NotFoundException('No such file in DB'); }
    const arrCategoryIds =  data.categoryIds.split(',').map(Number);
    return arrCategoryIds.map(id =>  this._categoryRepository.update({ id }, { image : files }));
  }

}
