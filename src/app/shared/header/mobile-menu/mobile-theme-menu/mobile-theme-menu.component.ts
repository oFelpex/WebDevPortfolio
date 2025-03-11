import { Component, HostListener, inject } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatBadgeModule } from '@angular/material/badge';

import { ThemeService } from '../../../../services/theme-service/theme.service';
import { Themes } from '../../../../models/themes';
import { MobileMenuComponent } from '../mobile-menu.component';

@Component({
  selector: 'app-mobile-theme-menu',
  imports: [MatListModule, MatExpansionModule, MatButtonModule, MatBadgeModule],
  templateUrl: './mobile-theme-menu.component.html',
  styleUrl: 'mobile-theme-menu.component.scss',
})
export class MobileThemeMenuSheetComponent {
  public themeService: ThemeService;
  constructor() {
    this.themeService = inject(ThemeService);
  }
  private _bottomSheetRef =
    inject<MatBottomSheetRef<MobileMenuComponent>>(MatBottomSheetRef);
  isMobile: boolean = window.innerWidth <= 768;

  get gamesOptions(): Themes[] {
    return this.themeService.getGamesNames();
  }
  get seasonsOptions(): Themes[] {
    return this.themeService.getSeasonsNames();
  }
  public getNameOfActualThemeFromLocalStorage(): Themes {
    return this.themeService.getNameOfActualTheme();
  }
  public changeTheme(theme: Themes) {
    this.themeService.changeTheme(theme);
    this._bottomSheetRef.dismiss();
  }
  public getTypeOfActualThemeFromLocalStorage(): string {
    return this.themeService.getTypeOfActualTheme();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = event.target.innerWidth <= 820;
    if (!this.isMobile) {
      this._bottomSheetRef.dismiss();
    }
  }
}
