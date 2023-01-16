/* eslint-disable no-console */
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CommonService } from './common.service.abstract';
import { ImageRepository } from '../repositories/image.repository';
import { Repository } from 'typeorm';
import { ProductService } from 'src/modules/product/services/product.service.abstract';
import * as fs from 'fs';

import type { FileEntity } from '../entities/images.entity';
import type { DeleteResult , UpdateResult } from 'typeorm';
import type { DeleteImageDTO } from '../dto/delete-image.dto';
import type { FileDTO } from '../dto/image.dto';
import type { SetImagesToProductDTO } from '../../product/dto/imagest-to-product.dto';

@Injectable()
export class CommonServiceImpl extends CommonService {

  constructor(
    @Inject(ImageRepository)
    private readonly _imageRepository: Repository<FileEntity>,
    private readonly _productService: ProductService,
  ) {
    super();
  }

  public override async saveImage(file: Express.Multer.File): Promise<FileEntity> {
    const path = './'+file.path;
    const size = file.size;
    const newImage = { path, size };
    return await this._imageRepository.save(newImage);
  }

  public override async deleteImage(name: DeleteImageDTO): Promise<DeleteResult> {
    /// maybe problem with unlink product
    const file = await this.existImage(name.name);
    if(!file) { throw new NotFoundException(); }
    fs.unlinkSync(file.path);
    return await this._imageRepository.delete({ path: file.path });
  }

  public override async getImageByName(name: string): Promise<FileDTO | null> {
    const path = './uploads/' + name;
    return await this._imageRepository.findOneBy({ path });
  }

  public override async existImage(name: string): Promise<FileDTO | null> {
    const fileDB = await this.getImageByName(name);
    if (!fileDB) { throw new NotFoundException('No such name in DB'); }
    if(!fs.existsSync(fileDB.path)) { throw new NotFoundException('There is no file'); }
    return fileDB;
  }

  public override async setImagesToProduct(id: number, data: SetImagesToProductDTO): Promise<Promise<UpdateResult>[]> {
    const product = await this._productService.getProduct(id);
    if(!product) { throw new NotFoundException('No such product');}
    const arrImagesName = await Promise.all(data.imagesNames.map( async name =>  this.existImage(name)));
    return arrImagesName.map( image => this._imageRepository.update({ id: image?.id }, { product }));
  }

}
