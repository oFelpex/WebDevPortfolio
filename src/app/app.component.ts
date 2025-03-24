import { Component, inject, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';

import { MatIconRegistry } from '@angular/material/icon';

import { LoadingComponent } from './shared/loading/loading.component';
import { LoadingService } from './services/loading-service/loading.service';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Felpex - Portfolio';
  private loadingService: LoadingService;
  private router: Router;
  private translate: TranslateService;

  constructor() {
    this.translate = inject(TranslateService);
    this.router = inject(Router);
    this.loadingService = inject(LoadingService);
    const matIconRegistry = inject(MatIconRegistry);
    const domSanitizer = inject(DomSanitizer);

    this.translate.use('en');
    // this.translate.use(this.translate.getBrowserCultureLang() || 'en');

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

  isLoading = false;
  ngOnInit() {
    this.loadingService.loading$.subscribe((loading) => {
      this.isLoading = loading;
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
        setTimeout(() => this.loadingService.hide(), 300);
      }
    });
  }
}
