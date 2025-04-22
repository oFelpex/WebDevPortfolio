import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';

import { LogoEffectsComponent } from '../../../../../logo-effects/logo-effects.component';
import { AudioService } from '../../../../../services/audio-service/audio.service';
import { ThemeService } from '../../../../../services/theme-service/theme.service';
import { Themes } from '../../../../../models/themes';
import { ResponsiveService } from '../../../../../services/responsive-service/responsive.service';
import { Subscription } from 'rxjs';
import { MobileNavMenuService } from '../../../../../services/mobile-menu-service/mobile-nav-menu.service';
import { MobileSoundboardMenuService } from '../../../../../services/mobile-soundboard-menu/mobile-soundboard-menu.service';
import { MobileMenuComponent } from '../../../../../shared/components/header/mobile-menu/mobile-menu.component';
import { MobileSoundboardComponent } from '../../../../../shared/components/header/mobile-soundboard/mobile-soundboard.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-minecraft-header',
  imports: [
    LogoEffectsComponent,
    MobileMenuComponent,
    MobileSoundboardComponent,
    MatButtonModule,
    MatMenuModule,
    MatBadgeModule,
    MatIconModule,
    TranslateModule,
    RouterModule,
  ],
  templateUrl: './minecraft-header.component.html',
  styleUrl: './minecraft-header.component.scss',
})
export class MinecraftHeaderComponent implements OnInit {
  public currentRoute!: string;
  public phrase!: string;
  public allRoutes: string[] = [
    '/home',
    '/projects',
    '/about-me',
    '/contact-me',
  ];
  public allLangs!: string[];
  public isMobile: boolean = window.innerWidth <= 820;

  // JUST A REMAINDER: CHANGE TO SOME SIMPLE PHRASES SO I CAN USE THE TRANSLATESERVICE
  private listOfPhrases: string[] = [
    'ONE',
    'TWO',
    'THREE',
    'FOUR',
    'FIVE',
    'SIX',
    'SEVEN',
    'EIGHT',
    'NINE',
    'TEN',
    'ELEVEN',
  ];
  private themeService: ThemeService;
  private audioService: AudioService;
  private translateService: TranslateService;
  private responsiveService: ResponsiveService;
  private router: Router;
  private routerSubscription!: Subscription;
  private responsiveSubscription!: Subscription;
  private mobileNavMenuService: MobileNavMenuService;
  private mobileSoundboardMenuService: MobileSoundboardMenuService;

  constructor() {
    this.mobileNavMenuService = inject(MobileNavMenuService);
    this.mobileSoundboardMenuService = inject(MobileSoundboardMenuService);
    this.audioService = inject(AudioService);
    this.themeService = inject(ThemeService);
    this.translateService = inject(TranslateService);
    this.responsiveService = inject(ResponsiveService);
    this.router = inject(Router);
  }

  ngOnInit(): void {
    this.phrase = this.listOfPhrases[this.phraseNumber()];
    this.allLangs = this.translateService.langs;

    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = this.router.url;
      }
    });
    this.responsiveSubscription = this.responsiveService.isMobile$.subscribe(
      (isMobile) => {
        this.isMobile = isMobile;
        if (!this.isMobile) {
          if (this.mobileNavMenuService.mobileNavMenu)
            if (this.mobileNavMenuService.mobileNavMenu.opened)
              this.mobileNavMenuService.toggleMobileNavMenu();

          if (this.mobileSoundboardMenuService.mobileSoundboardMenu)
            if (this.mobileSoundboardMenuService.mobileSoundboardMenu.opened)
              this.mobileSoundboardMenuService.toggleMobileSoundboardMenu();
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
    this.responsiveSubscription.unsubscribe();
  }

  private phraseNumber(): number {
    return Math.round(Math.random() * (this.listOfPhrases.length - 1));
  }

  public get actualTheme(): Themes {
    return this.themeService.getNameOfActualTheme();
  }
  public get allGamesThemes(): Themes[] {
    return this.themeService.getGamesNames();
  }
  public get allColorThemes(): Themes[] {
    return this.themeService.getColorsNames();
  }
  public changeTheme(theme: Themes): void {
    this.themeService.changeTheme(theme);
  }

  public changeLang(lang: string): void {
    this.translateService.use(lang);
  }
  public get actualLang(): string {
    return this.translateService.currentLang;
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

  public playClickSound(): void {
    this.audioService.playClickSound('Minecraft');
  }
}
