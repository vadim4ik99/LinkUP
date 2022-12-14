import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailServiceImpl } from './services/mail.service';
import { MailService } from './services/mail.service.abstract';

const mailService = { provide: MailService, useClass: MailServiceImpl };

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
            user: configService.get('MAIL_USER') as string,
            pass: configService.get('MAIL_PASS') as string,
          },
        },
        defaults: {
          from: configService.get('MAIL_FROM') as string,
        },
        template: {
          dir: __dirname + '/templates',
          adapter: new EjsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [mailService],
  exports: [mailService],
})
export class MailModule {}
