import { Component, inject } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

import { Photos } from '../../../../models/photos';

import { TranslateModule } from '@ngx-translate/core';
import { AudioService } from '../../../../services/audio-service/audio.service';
import { ThemeService } from '../../../../services/theme-service/theme.service';
import { Themes } from '../../../../models/themes';
@Component({
  selector: 'dialog-photo-full-screen',
  templateUrl: 'dialog-photo-full-screen.component.html',
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    TranslateModule,
  ],
  styleUrl: 'dialog-photo-full-screen.component.scss',
})
export class DialogPhotoFullScreenComponent {
  private audioService: AudioService;
  private themeService: ThemeService;

  public photo: Photos = inject(MAT_DIALOG_DATA);

  constructor() {
    this.themeService = inject(ThemeService);
    this.audioService = inject(AudioService);
  }

  public get getNameOfActualThemeFromLocalStorage(): Themes {
    return this.themeService.getNameOfActualTheme();
  }
  public playClickSound(themeName: string) {
    this.audioService.playClickSound(themeName);
  }
}
