import { Injectable } from '@nestjs/common';
import { CommonService } from './common.service.abstract';

@Injectable()
export class CommonServiceImpl extends CommonService {}
