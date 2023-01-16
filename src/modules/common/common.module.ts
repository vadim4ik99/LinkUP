import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CommonController } from './controllers/common.controller';
import { FileEntity } from './entities/images.entity';
import {
  ImageRepository,
  imageRepositoryFactory,
} from './repositories/image.repository';
import { CommonServiceImpl } from './services/common.service';
import { CommonService } from './services/common.service.abstract';

const imageRepository = {
  provide: ImageRepository,
  inject: [DataSource],
  useFactory: imageRepositoryFactory,
};

const commonService = { provide: CommonService, useClass: CommonServiceImpl };

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity])],
  controllers: [CommonController],
  providers: [imageRepository, commonService],
  exports: [commonService],
})
export class CommonModule {}
