import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesRepository } from '../repositories/categories.repositories';

@Injectable()
export class CategoriesService {

  constructor(
        @InjectRepository(CategoriesRepository)
        private categoriesRepository: CategoriesRepository,
  ) {}

}
