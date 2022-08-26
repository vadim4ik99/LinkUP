import { Controller } from '@nestjs/common';
import { AuthService } from '../services/auth.service.abstract';

@Controller()
export class AppController {

  constructor(private authService: AuthService) {}

}
