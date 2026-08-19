import { Component, inject, OnDestroy, signal } from '@angular/core';
import { Subscription } from 'rxjs';

import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogTitle,
  MatDialogActions,
  MatDialogClose,
  MatDialog,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';

import { ThemeService } from '../../../../../../../services/theme-service/theme.service';
import { Tw3DialogGamesComponent } from './themes/tw3-dialog-games/tw3-dialog-games.component';
import { Tw3DialogColorsComponent } from './themes/tw3-dialog-colors/tw3-dialog-colors.component';
import { Tw3DialogLangsComponent } from './langs/tw3-dialog-langs/tw3-dialog-langs.component';
import { AudioService } from '../../../../../../../services/audio-service/audio.service';
import { TranslateModule } from '@ngx-translate/core';
import { Themes } from '../../../../../../../models/themes';
import { Tw3DialogNavigateComponent } from './themes/tw3-dialog-navigate/tw3-dialog-navigate.component';
import { LanguageService } from '../../../../../../../services/language-service/language.service';

type HomeOptionsMenuState =
  | 'options'
  | 'themes'
  | 'langs'
  | 'gameThemes'
  | 'colorThemes';

@Component({
  selector: 'app-tw3-dialogs',
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatButtonModule,
    MatExpansionModule,
    Tw3DialogGamesComponent,
    Tw3DialogColorsComponent,
    Tw3DialogLangsComponent,
    Tw3DialogNavigateComponent,
    TranslateModule,
  ],
  templateUrl: './tw3-dialogs.component.html',
  styleUrl: './tw3-dialogs.component.scss',
})
export class TW3DialogsComponent implements OnDestroy {
  private themeService: ThemeService;
  private audioService: AudioService;
  private themeSubscription!: Subscription;
  private dialog: MatDialog;

  private languageService: LanguageService;

  public actualTheme!: Themes;
  public data = inject(MAT_DIALOG_DATA);
  public currentOptionsMenu = signal<HomeOptionsMenuState>('options');

  constructor() {
    this.audioService = inject(AudioService);
    this.themeService = inject(ThemeService);
    this.languageService = inject(LanguageService);

    this.dialog = inject(MatDialog);
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

  public playClickSound() {
    this.audioService.playClickSound('The Witcher 3');
  }

  public openThemesDialog() {
    this.playClickSound();
    this.dialog.open(TW3DialogsComponent, {
      data: {
        dialogType: 'Themes',
      },
    });
  }
  public openLangsDialog() {
    this.playClickSound();
    this.dialog.open(TW3DialogsComponent, {
      data: {
        dialogType: 'Langs',
      },
    });
  }

  public openTypeOfOptionsMenu(optionsMenuType: HomeOptionsMenuState): void {
    this.playClickSound();
    this.currentOptionsMenu.set(optionsMenuType);
  }
  public closeAllDialogs(): void {
    this.playClickSound();
    this.dialog.closeAll();
  }

  public changeThemes(selectedTheme: Themes): void {
    this.themeService.changeTheme(selectedTheme);
    this.closeAllDialogs();
  }

  public changeLang(selectedLang: string): void {
    this.languageService.setLanguage(selectedLang);
    this.closeAllDialogs();
  }
}
