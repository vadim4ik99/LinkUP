import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { AuthServiceImpl } from './services/auth.service';
import { AuthService } from './services/auth.service.abstract';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../../@framework/strategy/jwt.strategy';
import { MailModule } from '../mail/mail.module';
import { LocalStrategy } from '../../@framework/strategy/local.strategy';
import { AuthController } from './controllers/auth.controller';

const authService = { provide: AuthService, useClass: AuthServiceImpl };

@Module({
  imports: [
    UserModule,
    ConfigModule,
    PassportModule,
    MailModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [authService, LocalStrategy, JwtStrategy],
})

export class AuthModule {}
