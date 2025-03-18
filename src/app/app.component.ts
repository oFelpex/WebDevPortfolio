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

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Felpex - Portfolio';

  constructor(private router: Router, private loadingService: LoadingService) {
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
