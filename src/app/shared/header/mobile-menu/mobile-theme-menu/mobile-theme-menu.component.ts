import { Component, HostListener, inject } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatBadgeModule } from '@angular/material/badge';

import { ThemeService } from '../../../../services/theme-service/theme.service';
import { Themes } from '../../../../models/themes';
import { MobileMenuComponent } from '../mobile-menu.component';
import { MatDividerModule } from '@angular/material/divider';
import { TranslateModule } from '@ngx-translate/core';
import { AudioService } from '../../../../services/audio-service/audio.service';

@Component({
  selector: 'app-mobile-theme-menu',
  imports: [
    MatListModule,
    MatExpansionModule,
    MatButtonModule,
    MatBadgeModule,
    MatDividerModule,
    TranslateModule,
  ],
  templateUrl: './mobile-theme-menu.component.html',
  styleUrl: 'mobile-theme-menu.component.scss',
})
export class MobileThemeMenuSheetComponent {
  public actualThemeKey: string;
  private themeService: ThemeService;
  private audioService: AudioService;

  constructor() {
    this.themeService = inject(ThemeService);
    this.audioService = inject(AudioService);

    const themeType = this.getTypeOfActualThemeFromLocalStorage;
    const themeName = this.getNameOfActualThemeFromLocalStorage.name;

    this.actualThemeKey = `THEMES.${themeType}.${themeName}`;
  }
  private _bottomSheetRef =
    inject<MatBottomSheetRef<MobileMenuComponent>>(MatBottomSheetRef);
  isMobile: boolean = window.innerWidth <= 820;

  public get gamesOptions(): Themes[] {
    return this.themeService.getGamesNames();
  }
  public get colorsOptions(): Themes[] {
    return this.themeService.getColorsNames();
  }
  public get getNameOfActualThemeFromLocalStorage(): Themes {
    return this.themeService.getNameOfActualTheme();
  }
  public get getTypeOfActualThemeFromLocalStorage(): string {
    return this.themeService.getTypeOfActualTheme();
  }

  public changeTheme(theme: Themes): void {
    this.themeService.changeTheme(theme);
    this._bottomSheetRef.dismiss();
  }

  public playClickSound(themeName: string) {
    this.audioService.playClickSound(themeName);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = event.target.innerWidth <= 820;
    if (!this.isMobile) {
      this._bottomSheetRef.dismiss();
    }
  }
}
