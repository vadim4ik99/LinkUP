import type { UpdateResult } from 'typeorm';
import type { CategoriesImageDTO } from '../dto/categoriesImage.dto';

export abstract class CategoriesControllerAbs {

  public abstract setImageCategory(data: CategoriesImageDTO): Promise<Promise<UpdateResult>[]>

}
