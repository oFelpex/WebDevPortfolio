import { Component, inject } from '@angular/core';
import { SocialLinksComponent } from '../../../shared/social-links/social-links.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AudioService } from '../../../services/audio-service/audio.service';
import { ThemeService } from '../../../services/theme-service/theme.service';
import { Themes } from '../../../models/themes';
import { CustomSnackbarComponent } from '../../../shared/custom-snackbar/custom-snackbar.component';

@Component({
  selector: 'app-contact-me-aside',
  imports: [SocialLinksComponent, TranslateModule, MatTooltipModule],
  templateUrl: './contact-me-aside.component.html',
  styleUrl: './contact-me-aside.component.scss',
})
export class ContactMeAsideComponent {
  private snackBar: MatSnackBar;
  private audioService: AudioService;
  private themeService: ThemeService;

  constructor() {
    this.themeService = inject(ThemeService);
    this.audioService = inject(AudioService);
    this.snackBar = inject(MatSnackBar);
  }

  public get getNameOfActualThemeFromLocalStorage(): Themes {
    return this.themeService.getNameOfActualTheme();
  }
  public playClickSound(themeName: string) {
    this.audioService.playClickSound(themeName);
  }

  public clickToCopy(text: string) {
    switch (text) {
      case 'email':
        navigator.clipboard.writeText(`felipe95176@gmail.com`);
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: {
            message: 'SNACK-BAR.CONTACT-PAGE.COPY-EMAIL',
            theme: this.getNameOfActualThemeFromLocalStorage.name,
          },
          duration: 4000,
        });

        break;
      case 'number':
        navigator.clipboard.writeText(`+55 84 98709-5902`);
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: {
            message: 'SNACK-BAR.CONTACT-PAGE.COPY-NUMBER',
            theme: this.getNameOfActualThemeFromLocalStorage.name,
          },
          duration: 4000,
        });
        break;
    }
  }
}
