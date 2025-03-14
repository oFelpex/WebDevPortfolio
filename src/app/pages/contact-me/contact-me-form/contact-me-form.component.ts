import { Component } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

import { SocialLinksComponent } from '../../../shared/social-links/social-links.component';

@Component({
  selector: 'app-contact-me-form',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatTooltipModule,
    MatButtonModule,
    SocialLinksComponent,
  ],
  templateUrl: './contact-me-form.component.html',
  styleUrl: './contact-me-form.component.scss',
})
export class ContactMeFormComponent {
  public clickToCopy(text: string) {
    switch (text) {
      case 'email':
        navigator.clipboard.writeText(`felipe95176@gmail.com`);
        break;
      case 'number':
        navigator.clipboard.writeText(`+55 84 98709-5902`);
        break;
    }
  }

  sendEmail(form: FormData): void {
    emailjs
      .send(
        'service_felpex',
        'TEMPLATE_ID',
        {
          from_name: form.get('name'),
          subject: form.get('subject'),
          message: form.get('message'),
          reply_to: 'felipe95176@gmail.com',
        },
        'USER_ID'
      )
      .then(
        (result: EmailJSResponseStatus) => {
          console.log('SUCCESS!', result.status, result.text);
        },
        (error) => {
          console.log('FAILED...', error);
        }
      );
  }
}
