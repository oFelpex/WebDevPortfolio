import { Component, inject } from '@angular/core';
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
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { SocialLinksComponent } from '../../../shared/social-links/social-links.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-contact-me-form',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatTooltipModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    SocialLinksComponent,
  ],
  templateUrl: './contact-me-form.component.html',
  styleUrl: './contact-me-form.component.scss',
})
export class ContactMeFormComponent {
  public sendEmailForm: FormGroup;
  private snackBar: MatSnackBar;

  public clickToCopy(text: string) {
    switch (text) {
      case 'email':
        navigator.clipboard.writeText(`felipe95176@gmail.com`);
        this.snackBar.open('Email copied to clipboard!', 'Close', {
          duration: 4000,
        });
        break;
      case 'number':
        navigator.clipboard.writeText(`+55 84 98709-5902`);
        this.snackBar.open('Number copied to clipboard!', 'Close', {
          duration: 4000,
        });
        break;
    }
  }

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

    this.snackBar = inject(MatSnackBar);
  }

  public isSending: boolean = false;
  public sendEmail(formDirective: FormGroupDirective): void {
    if (this.sendEmailForm.valid) {
      this.isSending = true;
      this.sendEmailForm.disable();

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
            this.sendEmailForm.reset();
            formDirective.resetForm();

            this.isSending = false;
            this.sendEmailForm.enable();

            this.snackBar.open('Email sent successfully!', 'Close', {
              duration: 4000,
            });
          },
          (error) => {
            console.log('FAILED...', error);
            this.snackBar.open('Oops, try again later', 'Close', {
              duration: 4000,
            });
            this.isSending = false;
          }
        );
    } else {
      this.snackBar.open('You have to fill in the blanks correctly', 'Close', {
        duration: 4000,
      });
    }
  }
}
