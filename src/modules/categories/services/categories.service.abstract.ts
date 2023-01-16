import type { DeleteResult, UpdateResult } from 'typeorm';
import type { CategoriesInputDTO, CategoriesOutputDTO, CategoriesUpdateDTO } from '../dto/categories.dto';
import type { CategoriesImageDTO } from '../dto/categoriesImage.dto';

export abstract class CategoriesService {

  public abstract createCategory(createCategoryDto: CategoriesInputDTO): Promise<CategoriesOutputDTO>;

  public abstract editCategoryById(id: number,  productUpdateDto: CategoriesUpdateDTO): Promise<UpdateResult>;

  public abstract deleteCategoryById(id: number): Promise<DeleteResult>;

  public abstract getCategoryById(id: number): Promise<CategoriesOutputDTO>;

  public abstract setImageCategory(data: CategoriesImageDTO): Promise<Promise<UpdateResult>[]>;

}
