import type { EmailTamplate } from './mail.service';

export abstract class MailService {

    public abstract sendEmail(email: string, subject: string, token: string, page: EmailTamplate ): void

}
