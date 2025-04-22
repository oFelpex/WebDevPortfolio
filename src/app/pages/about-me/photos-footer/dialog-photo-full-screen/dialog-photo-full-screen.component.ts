import { Component, inject, OnDestroy, OnInit } from '@angular/core';

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
import { Subscription } from 'rxjs';
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
export class DialogPhotoFullScreenComponent implements OnInit, OnDestroy {
  private audioService: AudioService;
  private themeService: ThemeService;
  private themeSubscript!: Subscription;

  public actualTheme!: Themes;
  public photo: Photos = inject(MAT_DIALOG_DATA);

  constructor() {
    this.themeService = inject(ThemeService);
    this.audioService = inject(AudioService);
  }

  ngOnInit(): void {
    this.themeSubscript = this.themeService.actualTheme$.subscribe((theme) => {
      this.actualTheme = theme;
    });
  }
  ngOnDestroy(): void {
    this.themeSubscript.unsubscribe();
  }

  public playClickSound(themeName: string) {
    this.audioService.playClickSound(themeName);
  }
}
