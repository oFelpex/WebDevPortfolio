import { Component, inject, OnInit, Type } from '@angular/core';
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

import { MatIconRegistry } from '@angular/material/icon';

import { LoadingService } from './services/loading-service/loading.service';
import { ThemeService } from './services/theme-service/theme.service';
import { ResponsiveService } from './services/responsive-service/responsive.service';

import { TranslateService } from '@ngx-translate/core';

import { LoadingComponent } from './shared/components/loading/loading.component';
import { ShowSoundboardButtonComponent } from './shared/components/soundboard/show-soundboard-button/show-soundboard-button.component';
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
export class AppComponent implements OnInit {
  private loadingService: LoadingService;
  private router: Router;
  private translate: TranslateService;
  private themeService: ThemeService;
  private responsiveService: ResponsiveService;
  public isMobile: boolean = false;
  public isLoading: boolean = false;
  public selectedNavbarComponent!: Type<any>;

  constructor() {
    this.translate = inject(TranslateService);
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
          `assets/icons/social-icons/${icon}.svg`
        )
      );
    });
    hardSkillIcons.forEach((icon) => {
      matIconRegistry.addSvgIcon(
        icon,
        domSanitizer.bypassSecurityTrustResourceUrl(
          `assets/icons/hardskill-icons/${icon}.svg`
        )
      );
    });
  }

  ngOnInit() {
    this.themeService.actualTheme$.subscribe(() => {
      this.selectedNavbarComponent = this.themeService.getNavbarComponent();
    });

    this.responsiveService.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
    this.translate.addLangs(['en-US', 'pt-BR']);

    let lang = localStorage.getItem('lang');
    if (lang) {
      let parsedLang = JSON.parse(lang);
      this.translate.use(parsedLang);
      document.documentElement.lang = parsedLang;
    } else {
      let browserLang = this.translate.getBrowserCultureLang();
      if (browserLang) {
        this.translate.use(browserLang || 'en-US');
        localStorage.setItem('lang', JSON.stringify(browserLang));
        document.documentElement.lang = browserLang;
      } else {
        this.translate.use('en-US');
        localStorage.setItem('lang', JSON.stringify('en-US'));
        document.documentElement.lang = 'en-US';
      }
    }

    this.loadingService.loading$.subscribe((loading) => {
      this.isLoading = loading;
    });

    this.translate.onLangChange.asObservable().subscribe(() => {
      const currentRoute = this.router.url;
      let pageTitle = this.getTitleByRoute(currentRoute);
      document.title = pageTitle;
      document.documentElement.lang = this.translate.currentLang;
    });

    this.router.events.subscribe((event) => {
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

  public get getTypeOfActualTheme() {
    return this.themeService.getTypeOfActualTheme();
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

    return this.translate.currentLang === 'en-US'
      ? titlesEN_US[route] || 'Ops, something is wrong'
      : titlesPT_BR[route] || 'Opa, algo está errado';
  }
}
