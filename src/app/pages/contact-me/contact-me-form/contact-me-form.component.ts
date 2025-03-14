import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

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
    ReactiveFormsModule,
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
  public sendEmailForm: FormGroup;

  constructor() {
    this.sendEmailForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.email,
      ]),
      subject: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      message: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  sendEmail(formDirective: FormGroupDirective): void {
    if (this.sendEmailForm.valid) {
      emailjs
        .send(
          'service_felpex',
          'template_50rc3zh',
          {
            name: this.sendEmailForm.value.name,
            time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
            email: this.sendEmailForm.value.email,
            subject: this.sendEmailForm.value.subject,
            message: this.sendEmailForm.value.message,
            reply_to: 'felipe95176@gmail.com',
          },
          'gDug2nvSSF1AzFyDS'
        )
        .then(
          (result: EmailJSResponseStatus) => {
            console.log('SUCCESS!', result.status, result.text);
            console.log(this.sendEmailForm.value);
            this.sendEmailForm.reset();
            formDirective.resetForm();
          },
          (error) => {
            console.log('FAILED...', error);
          }
        );
    }
  }
}
