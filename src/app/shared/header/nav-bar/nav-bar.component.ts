import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatBadgeModule } from '@angular/material/badge';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MobileMenuService } from '../../../services/mobile-menu-service/mobile-menu.service';
import { ThemeService } from '../../../services/theme-service/theme.service';
import { Themes } from '../../../models/themes';
import { SocialLinksComponent } from '../../social-links/social-links.component';
import { MatDividerModule } from '@angular/material/divider';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav-bar',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatBadgeModule,
    MatToolbarModule,
    MatDividerModule,
    SocialLinksComponent,
    RouterModule,
    TranslateModule,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  private themeService: ThemeService;
  private mobileMenuService: MobileMenuService;
  public navBarSvgIconsColor: string = '#000';
  private translate: TranslateService;

  constructor() {
    this.translate = inject(TranslateService);
    this.mobileMenuService = inject(MobileMenuService);
    this.themeService = inject(ThemeService);
  }

  public changeLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('lang', JSON.stringify(lang));
  }
  public get currentLang() {
    return this.translate.currentLang;
  }
  public get AllLangs(): string[] {
    return this.translate.getLangs();
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
  public get getNameOfActualThemeFromLocalStorage(): Themes {
    return this.themeService.getNameOfActualTheme();
  }
  public changeTheme(theme: Themes) {
    this.themeService.changeTheme(theme);
  }
  public getTypeOfActualThemeFromLocalStorage(): string {
    return this.themeService.getTypeOfActualTheme();
  }
}
