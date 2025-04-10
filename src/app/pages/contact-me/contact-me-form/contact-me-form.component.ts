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

import { fadeInDownToUp_height } from '../../../shared/animations/fadeAndHeight-animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { AudioService } from '../../../services/audio-service/audio.service';
import { ThemeService } from '../../../services/theme-service/theme.service';
import { Themes } from '../../../models/themes';
import { CustomSnackbarComponent } from '../../../shared/custom-snackbar/custom-snackbar.component';

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
    TranslateModule,
  ],
  templateUrl: './contact-me-form.component.html',
  styleUrl: './contact-me-form.component.scss',
  animations: [fadeInDownToUp_height],
})
export class ContactMeFormComponent {
  public sendEmailForm: FormGroup;
  private snackBar: MatSnackBar;
  private audioService: AudioService;
  private themeService: ThemeService;
  public isSending: boolean = false;

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
    this.themeService = inject(ThemeService);
    this.audioService = inject(AudioService);
  }

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

            this.snackBar.openFromComponent(CustomSnackbarComponent, {
              data: {
                message: 'SNACK-BAR.CONTACT-PAGE.SENT-EMAIL',
                theme: this.getNameOfActualThemeFromLocalStorage.name,
              },
              duration: 4000,
            });
          },
          (error) => {
            console.log('FAILED...', error);

            this.snackBar.openFromComponent(CustomSnackbarComponent, {
              data: {
                message: 'SNACK-BAR.CONTACT-PAGE.ERROR-SENT-EMAIL',
                theme: this.getNameOfActualThemeFromLocalStorage.name,
              },
              duration: 4000,
            });

            this.isSending = false;
          }
        );
    } else {
      this.snackBar.openFromComponent(CustomSnackbarComponent, {
        data: {
          message: 'SNACK-BAR.CONTACT-PAGE.ERROR-BLANK-INPUTS',
          theme: this.getNameOfActualThemeFromLocalStorage.name,
        },
        duration: 4000,
      });
    }
  }

  public get getNameOfActualThemeFromLocalStorage(): Themes {
    return this.themeService.getNameOfActualTheme();
  }
  public playClickSound(themeName: string) {
    this.audioService.playClickSound(themeName);
  }
}
