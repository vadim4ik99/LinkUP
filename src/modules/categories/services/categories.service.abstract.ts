import type { DeleteResult, UpdateResult } from 'typeorm';
import type { CategoriesDTO, CategoriesUpdateDTO } from '../dto/categories.dto';

export abstract class CategoriesService {

  public abstract createCategory(createCategoryDto: CategoriesDTO): Promise<CategoriesDTO>;

  public abstract editCategoryById(id: number,  productUpdateDto: CategoriesUpdateDTO): Promise<UpdateResult>;

  public abstract deleteCategoryById(id: number): Promise<DeleteResult>;

  public abstract getCategoryById(id: number): Promise<CategoriesDTO | null>;

}
