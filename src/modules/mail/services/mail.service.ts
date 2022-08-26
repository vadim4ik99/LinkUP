import { Injectable } from '@nestjs/common';
import { MailService } from './mail.service.abstract';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

export enum EmailTamplate {
  Welcome = 'welcome',
  ForgotPassword = 'forgotpassword'
}

@Injectable()
export class MailServiceImpl extends MailService {

  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {
    super();
  }

  public sendEmail(email: string, subject: string, token: string, page: EmailTamplate): void {
    this.mailerService
      .sendMail({
        to: email,
        from: this.configService.get('MAIL_FROM'),
        subject,
        template: __dirname + page, // The `.pug`, `.ejs` or `.hbs` extension is appended automatically.
        context: {
          token,
        },
      });
  }

}
