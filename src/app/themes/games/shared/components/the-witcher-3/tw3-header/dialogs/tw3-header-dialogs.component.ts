import { Component, inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogTitle,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';

import { ThemeService } from '../../../../../../../services/theme-service/theme.service';
import { Tw3HeaderDialogGamesComponent } from './themes/tw3-header-dialog-games/tw3-header-dialog-games.component';
import { Tw3HeaderDialogColorsComponent } from './themes/tw3-header-dialog-colors/tw3-header-dialog-colors.component';
import { Tw3DialogLangsComponent } from './langs/tw3-dialog-langs/tw3-dialog-langs.component';
import { AudioService } from '../../../../../../../services/audio-service/audio.service';
import { TranslateModule } from '@ngx-translate/core';
import { Themes } from '../../../../../../../models/themes';
import { LanguageService } from '../../../../../../../services/language-service/language.service';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-tw3-header-dialogs',
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatButtonModule,
    MatExpansionModule,
    MatSliderModule,
    Tw3HeaderDialogGamesComponent,
    Tw3HeaderDialogColorsComponent,
    Tw3DialogLangsComponent,
    TranslateModule,
  ],
  templateUrl: './tw3-header-dialogs.component.html',
  styleUrl: './tw3-header-dialogs.component.scss',
})
export class TW3HeaderDialogsComponent implements OnDestroy {
  private themeService: ThemeService;
  private themeSubscription!: Subscription;
  private audioService: AudioService;

  private languageService: LanguageService;

  public actualTheme!: Themes;
  public isMobile: boolean = window.innerWidth <= 820;
  public data = inject(MAT_DIALOG_DATA);

  constructor() {
    this.audioService = inject(AudioService);
    this.themeService = inject(ThemeService);
    this.languageService = inject(LanguageService);
  }

  ngOnInit(): void {
    this.themeSubscription = this.themeService.actualTheme$.subscribe(
      (theme) => {
        this.actualTheme = theme;
      },
    );
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  public get themesTypes(): ('Games' | 'Colors')[] {
    return this.themeService.getThemesTypes();
  }
  public get gamesOptions(): Themes[] {
    return this.themeService.getGamesNames();
  }
  public get colorsOptions(): Themes[] {
    return this.themeService.getColorsNames();
  }

  public get allLangs(): string[] {
    return this.languageService.getSupportedLangs();
  }

  public playClickSound(): void {
    this.audioService.playClickSound('The Witcher 3');
  }
  public playMouseEnterOrLeaveSFX(): void {
    this.audioService.playSound('The Witcher 3-mouseEnterOrLeave');
  }
  public get actualMusicVolume(): number {
    return this.audioService.getMusicVolume();
  }
  public get actualSfxVolume(): number {
    return this.audioService.getSfxVolume();
  }
  public setSfxVolume(sliderValue: string): void {
    const sfxVolume: number = Number(sliderValue) / 100;
    this.audioService.setSfxVolume(sfxVolume);
  }
  public setMusicVolume(sliderValue: string): void {
    const musicVolume: number = Number(sliderValue) / 100;
    this.audioService.setMusicVolume(musicVolume);
  }
}
