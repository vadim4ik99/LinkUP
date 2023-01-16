import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/';
import { DataSource } from 'typeorm';
import { CategoriesController } from './controllers/categories.controller';
import { CategoriesEntity } from './entities/categories.entity';
import {
  CategoryRepository,
  categoryRepositoryFactory,
} from './repositories/categories.repository';
import { CategoriesServiceImpl } from './services/categories.service';
import { CategoriesService } from './services/categories.service.abstract';

const categoryRepository = {
  provide: CategoryRepository,
  inject: [DataSource],
  useFactory: categoryRepositoryFactory,
};

const categoryService = {
  provide: CategoriesService,
  useClass: CategoriesServiceImpl,
};

@Module({
  imports: [TypeOrmModule.forFeature([CategoriesEntity])],
  controllers: [CategoriesController],
  providers: [categoryService, categoryRepository],
})
export class CategoriesModule {}
