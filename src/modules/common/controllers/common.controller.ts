/* eslint-disable no-console */
import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CommonService } from '../services/common.service.abstract';
import { CommonControllerAbs } from './common.controller.abstract';

import type { DeleteResult } from 'typeorm';
import type { FileEntity } from '../entities/images.entity';
import { DeleteImageDTO } from '../dto/delete-image.dto';

@Controller()
export class CommonController extends CommonControllerAbs {

  constructor(private readonly _commonService: CommonService) {
    super();
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file',
    { storage: diskStorage({
      destination: './uploads',
      filename: (_req, file, cb) => {
        const uniqSyfix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        const filename =  `${uniqSyfix}${ext}`;
        cb (null, filename);
      },
    }),
    }),
  )
  public override upload(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000 }),
          new FileTypeValidator({ fileType: 'image/jpeg|image/png' }),
        ],
      }),
    )
      file: Express.Multer.File,
  ): Promise<FileEntity> {
    return this._commonService.saveImage(file);
  }

  @Delete('/delete')
  public override deleteImage(@Body() name: DeleteImageDTO): Promise<DeleteResult> {
    return this._commonService.deleteImage(name);
  }

}
