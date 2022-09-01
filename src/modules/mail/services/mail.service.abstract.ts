import type { EmailTamplate } from './mail.service';

export abstract class MailService {
  public abstract sendEmail(
    email: string,
    subject: string,
    page: EmailTamplate,
    token?: string,
    password?: string,
  ): void;
}
