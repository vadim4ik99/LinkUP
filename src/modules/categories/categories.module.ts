import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { CategoriesController } from './controllers/categories.controller';
import { CategoriesEntity } from './entities/categories.entity';
import { CategoryRepository, categoryRepositoryFactory } from './repositories/categories.repository';
import { CategoriesServiceImpl } from './services/categories.service';
import { CategoriesService } from './services/categories.service.abstract';

const categoryRepository = {
  provide: CategoryRepository,
  inject: ['DATA_SOURCE'],
  useFactory: categoryRepositoryFactory,
};

const categoryService = { provide: CategoriesService, useClass: CategoriesServiceImpl };

@Module({
  imports: [TypeOrmModule.forFeature([CategoriesEntity])],
  controllers: [CategoriesController],
  providers: [categoryService, categoryRepository],
})
export class CategoriesModule {}
