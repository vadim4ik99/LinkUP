import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CategoryRepository } from '../repositories/categories.repository';
import { CategoriesService } from './categories.service.abstract';
import { CategoriesOutputDTO } from '../dto/categories.dto';

import type { CategoriesUpdateDTO , CategoriesInputDTO } from '../dto/categories.dto';
import type { CategoriesEntity } from '../entities/categories.entity';
import type { UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class CategoriesServiceImpl extends CategoriesService {

  constructor(
    @Inject(CategoryRepository)
    private readonly _categoryRepository: Repository<CategoriesEntity>,
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
    const category = await this._categoryRepository.findOneBy({ id });
    if (!category) { throw new NotFoundException('Can`t find category');}
    return new CategoriesOutputDTO(category);
  }

}
