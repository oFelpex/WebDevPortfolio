import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatBadgeModule } from '@angular/material/badge';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MobileNavMenuService } from '../../../../services/mobile-menu-service/mobile-nav-menu.service';
import { ThemeService } from '../../../../services/theme-service/theme.service';
import { Themes } from '../../../../models/themes';
import { SocialLinksComponent } from '../../../components/social-links/social-links.component';

import {
  LangChangeEvent,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { AudioService } from '../../../../services/audio-service/audio.service';
import { CustomSnackbarComponent } from '../../../components/custom-snackbar/custom-snackbar.component';
import { LogoEffectsComponent } from '../../../../logo-effects/logo-effects.component';
import { MobileSoundboardMenuService } from '../../../../services/mobile-soundboard-menu/mobile-soundboard-menu.service';

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
    MatTooltipModule,
    SocialLinksComponent,
    RouterModule,
    TranslateModule,
    LogoEffectsComponent,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent implements OnInit, OnDestroy {
  private themeService: ThemeService;
  private mobileNavMenuService: MobileNavMenuService;
  private mobileSoundboardMenuService: MobileSoundboardMenuService;
  private translate: TranslateService;
  private snackBar: MatSnackBar;
  private router: Router;
  private translateSubscription!: Subscription;
  private routerSubscription!: Subscription;
  private audioService: AudioService;
  public currentRoute!: string;
  public currentLang!: string;
  public actualThemeKey: string;

  constructor() {
    this.translate = inject(TranslateService);

    this.mobileNavMenuService = inject(MobileNavMenuService);
    this.mobileSoundboardMenuService = inject(MobileSoundboardMenuService);
    this.audioService = inject(AudioService);

    this.themeService = inject(ThemeService);
    this.snackBar = inject(MatSnackBar);
    this.router = inject(Router);

    const themeType = this.getTypeOfActualThemeFromLocalStorage;
    const themeName = this.getNameOfActualThemeFromLocalStorage.name;

    this.actualThemeKey = `THEMES.${themeType}.${themeName}`;
  }

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang;

    this.translateSubscription = this.translate.onLangChange
      .asObservable()
      .subscribe((event: LangChangeEvent) => {
        this.currentLang = event.lang;
      });

    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = this.router.url;
      }
    });
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
    this.translateSubscription.unsubscribe();
  }

  public changeLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('lang', JSON.stringify(lang));

    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      data: {
        message: 'SNACK-BAR.NAV-BAR.CHANGE-LANG',
        theme: this.getNameOfActualThemeFromLocalStorage.name,
      },
      duration: 4000,
    });
  }
  public get AllLangs(): string[] {
    return this.translate.getLangs();
  }

  public playClickSound(themeName: string) {
    this.audioService.playClickSound(themeName);
  }

  public toggleMobileNavMenu() {
    if (this.mobileSoundboardMenuService.mobileSoundboardMenu) {
      if (this.mobileSoundboardMenuService.mobileSoundboardMenu.opened) {
        this.mobileNavMenuService.toggleMobileNavMenu();
        this.mobileSoundboardMenuService.toggleMobileSoundboardMenu();
        return;
      }
      this.mobileNavMenuService.toggleMobileNavMenu();
      return;
    }
    this.mobileNavMenuService.toggleMobileNavMenu();
  }
  public toggleMobileSoundboardMenu() {
    if (this.mobileNavMenuService.mobileNavMenu) {
      if (this.mobileNavMenuService.mobileNavMenu.opened) {
        this.mobileSoundboardMenuService.toggleMobileSoundboardMenu();
        this.mobileNavMenuService.toggleMobileNavMenu();
        return;
      }
      this.mobileSoundboardMenuService.toggleMobileSoundboardMenu();
      return;
    }
    this.mobileSoundboardMenuService.toggleMobileSoundboardMenu();
  }

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

  public changeTheme(theme: Themes) {
    this.themeService.changeTheme(theme);

    const themeType = this.getTypeOfActualThemeFromLocalStorage;
    const themeName = this.getNameOfActualThemeFromLocalStorage.name;

    this.actualThemeKey = `THEMES.${themeType}.${themeName}`;
  }
}
