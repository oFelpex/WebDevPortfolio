import { Component, inject, model, signal } from '@angular/core';
import {
  MatDialog,
  MatDialogClose,
  MatDialogContent,
} from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeService } from '../../../../../../../services/theme-service/theme.service';
import { Subscription } from 'rxjs';
import { AudioService } from '../../../../../../../services/audio-service/audio.service';
import { LanguageService } from '../../../../../../../services/language-service/language.service';
import { Themes } from '../../../../../../../models/themes';

type HomeOptionsMenuState =
  | 'options'
  | 'themes'
  | 'langs'
  | 'gameThemes'
  | 'colorThemes';

@Component({
  selector: 'app-tw3-dialog-options',
  imports: [TranslateModule, MatDialogClose, MatDialogContent],
  templateUrl: './tw3-dialog-options.component.html',
  styleUrl: './tw3-dialog-options.component.scss',
})
export class Tw3DialogOptionsComponent {
  private themeService: ThemeService;
  private themeSubscription!: Subscription;
  private audioService: AudioService;
  private languageService: LanguageService;
  private dialog: MatDialog;

  public actualTheme!: Themes;
  public currentOptionsMenu = model<HomeOptionsMenuState>('options');

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
