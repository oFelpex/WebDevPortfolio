import { Component, HostListener, inject } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatBadgeModule } from '@angular/material/badge';

import { ThemeService } from '../../../services/theme-service/theme.service';
import { Themes } from '../../../models/themes';
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

  selectTheme(gamesOptions: Themes): void {
    this.themeService.changeTheme(gamesOptions);
    this._bottomSheetRef.dismiss();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = event.target.innerWidth <= 768;
    if (!this.isMobile) {
      this._bottomSheetRef.dismiss();
    }
  }
}
