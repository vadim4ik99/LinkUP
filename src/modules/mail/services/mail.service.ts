import { Injectable } from '@nestjs/common';
import { MailService } from './mail.service.abstract';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import type { SentMessageInfo } from 'nodemailer';

export enum EmailTamplate {
  Welcome = 'welcome',
  ForgotPassword = 'password',
}

@Injectable()
export class MailServiceImpl extends MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {
    super();
  }

  public sendEmail(
    email: string,
    subject: string,
    page: EmailTamplate,
    token?: string,
    password?: string,
  ): Promise<SentMessageInfo> {
    return this.mailerService.sendMail({
      to: email,
      from: this.configService.get('MAIL_FROM'),
      subject,
      template: __dirname + page,
      context: {
        token,
        password,
      },
    });
  }
}
