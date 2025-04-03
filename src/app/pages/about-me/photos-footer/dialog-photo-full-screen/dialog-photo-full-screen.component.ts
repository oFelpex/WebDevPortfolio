import { Component, Inject, inject } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
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
})
export class DialogPhotoFullScreenComponent {
  private audioService: AudioService;
  private themeService: ThemeService;

  constructor(@Inject(MAT_DIALOG_DATA) public photo: Photos) {
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
