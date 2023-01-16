import type { SetImagesToProductDTO } from '../../product/dto/imagest-to-product.dto';
import type { DeleteResult, UpdateResult } from 'typeorm';
import type { DeleteImageDTO } from '../dto/delete-image.dto';
import type { FileDTO } from '../dto/image.dto';
import type { FileEntity } from '../entities/images.entity';

export abstract class CommonService {

  public abstract saveImage(file: Express.Multer.File): Promise<FileEntity>;

  public abstract deleteImage(name: DeleteImageDTO): Promise<DeleteResult>;

  public abstract getImageByName(name: string): Promise<FileDTO | null>;

  public abstract existImage(name: string): Promise<FileDTO | null>;

  public abstract setImagesToProduct(id: number, data: SetImagesToProductDTO): Promise<Promise<UpdateResult>[]> ;

}
