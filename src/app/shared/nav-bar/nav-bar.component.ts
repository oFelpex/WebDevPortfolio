import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatBadgeModule } from '@angular/material/badge';

import { MobileMenuService } from '../../services/mobile-menu-service/mobile-menu.service';
import { ThemeService } from '../../services/theme-service/theme.service';
import { Themes } from '../../models/themes';
import { SocialLinksComponent } from '../social-links/social-links.component';

@Component({
  selector: 'app-nav-bar',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatBadgeModule,
    SocialLinksComponent,
    RouterModule,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  private themeService: ThemeService;
  private mobileMenuService: MobileMenuService;
  public navBarSvgIconsColor: string = '#000';

  constructor() {
    this.mobileMenuService = inject(MobileMenuService);
    this.themeService = inject(ThemeService);
  }

  public toggleMobileMenu() {
    this.mobileMenuService.toggleMobileMenu();
  }

  get gamesOptions(): Themes[] {
    return this.themeService.getGamesNames();
  }
  get seasonsOptions(): Themes[] {
    return this.themeService.getSeasonsNames();
  }
  get colorsOptions(): Themes[] {
    return this.themeService.getColorsNames();
  }
  public getNameOfActualThemeFromLocalStorage(): Themes {
    return this.themeService.getNameOfActualTheme();
  }
  public changeTheme(theme: Themes) {
    this.themeService.changeTheme(theme);
  }
  public getTypeOfActualThemeFromLocalStorage(): string {
    return this.themeService.getTypeOfActualTheme();
  }
}
