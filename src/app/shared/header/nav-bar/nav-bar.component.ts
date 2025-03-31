import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

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

import {
  LangChangeEvent,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

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
export class NavBarComponent implements OnInit, OnDestroy {
  private themeService: ThemeService;
  private mobileMenuService: MobileMenuService;
  private translate: TranslateService;
  private snackBar: MatSnackBar;
  private router: Router;
  public currentRoute!: string;
  public currentLang!: string;
  private translateSubscription!: Subscription;

  constructor() {
    this.translate = inject(TranslateService);
    this.mobileMenuService = inject(MobileMenuService);
    this.themeService = inject(ThemeService);
    this.snackBar = inject(MatSnackBar);
    this.router = inject(Router);

    this.currentRoute = this.router.url;
  }

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang;

    this.translateSubscription = this.translate.onLangChange
      .asObservable()
      .subscribe((event: LangChangeEvent) => {
        this.currentLang = event.lang;
      });
  }

  ngOnDestroy(): void {
    this.translateSubscription.unsubscribe();
  }

  public changeLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('lang', JSON.stringify(lang));

    lang === 'en-US'
      ? this.snackBar.open(`Language changed to en-US`, 'Close', {
          duration: 4000,
        })
      : this.snackBar.open(`Língua trocada para pt-BR`, 'Fechar', {
          duration: 4000,
        });
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
