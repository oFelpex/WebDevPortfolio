import { Component, inject, OnDestroy, OnInit, Type } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { NgComponentOutlet } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

import { MatIconRegistry } from '@angular/material/icon';

import { LoadingService } from './services/loading-service/loading.service';
import { ThemeService } from './services/theme-service/theme.service';
import { ResponsiveService } from './services/responsive-service/responsive.service';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { ShowSoundboardButtonComponent } from './shared/components/soundboard/show-soundboard-button/show-soundboard-button.component';
import { Themes } from './models/themes';
import { Subscription } from 'rxjs';
import { LanguageService } from './services/language-service/language.service';
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    LoadingComponent,
    ShowSoundboardButtonComponent,
    NgComponentOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  private loadingService: LoadingService;
  private router: Router;

  private themeService: ThemeService;
  private responsiveService: ResponsiveService;
  private themeSubscription!: Subscription;
  private responsiveSubscription!: Subscription;
  private loadingSubscription!: Subscription;
  private languageSubscription!: Subscription;
  private routerSubscription!: Subscription;
  private languageService = inject(LanguageService);

  public actualTheme!: Themes;
  public isMobile: boolean = false;
  public isLoading: boolean = false;
  public selectedNavbarComponent!: Type<any>;

  constructor() {
    this.router = inject(Router);
    this.loadingService = inject(LoadingService);
    this.themeService = inject(ThemeService);
    this.responsiveService = inject(ResponsiveService);

    const matIconRegistry = inject(MatIconRegistry);
    const domSanitizer = inject(DomSanitizer);

    const socialIcons = [
      'icon-linkedin',
      'icon-whatsapp',
      'icon-github',
      'icon-twitter',
    ];
    const hardSkillIcons = [
      'icon-html',
      'icon-css',
      'icon-scss',
      'icon-bootstrap',
      'icon-angular',
      'icon-js',
      'icon-ts',
      'icon-api',
    ];

    socialIcons.forEach((icon) => {
      matIconRegistry.addSvgIcon(
        icon,
        domSanitizer.bypassSecurityTrustResourceUrl(
          `assets/icons/social-icons/${icon}.svg`,
        ),
      );
    });
    hardSkillIcons.forEach((icon) => {
      matIconRegistry.addSvgIcon(
        icon,
        domSanitizer.bypassSecurityTrustResourceUrl(
          `assets/icons/hardskill-icons/${icon}.svg`,
        ),
      );
    });
  }

  ngOnInit() {
    this.themeSubscription = this.themeService.actualTheme$.subscribe(
      (theme) => {
        this.actualTheme = theme;
        this.selectedNavbarComponent = this.themeService.getHeaderComponent();
      },
    );

    this.responsiveSubscription = this.responsiveService.isMobile$.subscribe(
      (isMobile) => {
        this.isMobile = isMobile;
      },
    );

    this.loadingSubscription = this.loadingService.loading$.subscribe(
      (loading) => {
        this.isLoading = loading;
      },
    );
    this.languageSubscription =
      this.languageService.onLanguageChange$.subscribe((e) => {
        const currentRoute = this.router.url;
        let pageTitle = this.getTitleByRoute(currentRoute);
        document.title = pageTitle;

        this.languageService.setLanguage(e.lang);
      });

    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loadingService.show();
      }

      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        const currentRoute = this.router.url;
        let pageTitle = this.getTitleByRoute(currentRoute);
        document.title = pageTitle;
        setTimeout(() => this.loadingService.hide(), 300);
      }
    });
  }
  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
    this.languageSubscription.unsubscribe();
    this.themeSubscription.unsubscribe();
    this.responsiveSubscription.unsubscribe();
    this.loadingSubscription.unsubscribe();
  }

  private getTitleByRoute(route: string): string {
    const titlesEN_US: { [key: string]: string } = {
      '/home': 'Felpex - My website',
      '/projects': 'Felpex - Projects',
      '/about-me': 'Felpex - About me',
      '/contact-me': 'Felpex - Contact me',
    };
    const titlesPT_BR: { [key: string]: string } = {
      '/home': 'Felpex - Meu Site',
      '/projects': 'Felpex - Projetos',
      '/about-me': 'Felpex - Sobre mim',
      '/contact-me': 'Felpex - Contatos',
    };

    return this.languageService.getCurrentLanguage() === 'en-US'
      ? titlesEN_US[route] || 'Ops, something is wrong'
      : titlesPT_BR[route] || 'Opa, algo está errado';
  }
}
