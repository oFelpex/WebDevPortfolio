import { Component, Inject, inject } from '@angular/core';
import { ThemeService } from '../../../services/theme-service/theme.service';
import { AudioService } from '../../../services/audio-service/audio.service';
import { Themes } from '../../../models/themes';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-custom-snackbar',
  imports: [MatButtonModule, TranslateModule],
  templateUrl: './custom-snackbar.component.html',
  styleUrl: './custom-snackbar.component.scss',
})
export class CustomSnackbarComponent {
  private audioService: AudioService;
  private themeService: ThemeService;
  private snackBarRef: MatSnackBarRef<CustomSnackbarComponent>;
  message: string;
  themeNameMessage: string;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.themeService = inject(ThemeService);
    this.audioService = inject(AudioService);
    this.snackBarRef = inject(MatSnackBarRef<CustomSnackbarComponent>);
    this.message = data.message;
    this.themeNameMessage = data.themeNameMessage;
  }

  public get getNameOfActualThemeFromLocalStorage(): Themes {
    return this.themeService.getNameOfActualTheme();
  }
  public playClickSound(themeName: string) {
    this.audioService.playClickSound(themeName);
  }

  public dismiss(): void {
    this.snackBarRef.dismiss();
  }
}
