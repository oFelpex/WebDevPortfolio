import { Component, inject, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

import { LogoEffectsComponent } from '../../../../../logo-effects/logo-effects.component';
import { DialogsComponent } from './dialogs/dialogs.component';
import { AudioService } from '../../../../../services/audio-service/audio.service';
import { MobileSoundboardMenuService } from '../../../../../services/mobile-soundboard-menu/mobile-soundboard-menu.service';
import { MobileNavMenuService } from '../../../../../services/mobile-menu-service/mobile-nav-menu.service';
import { ResponsiveService } from '../../../../../services/responsive-service/responsive.service';
import { MobileSoundboardComponent } from '../../../../../shared/components/header/mobile-soundboard/mobile-soundboard.component';
import { MobileMenuComponent } from '../../../../../shared/components/header/mobile-menu/mobile-menu.component';
@Component({
  selector: 'app-tw3-header',
  imports: [
    MatButtonModule,
    MatIconModule,
    LogoEffectsComponent,
    MobileMenuComponent,
    MobileSoundboardComponent,
  ],
  templateUrl: './tw3-header.component.html',
  styleUrl: './tw3-header.component.scss',
})
export class Tw3NavBarComponent implements OnInit, OnDestroy {
  private router: Router;
  private routerSubscription!: Subscription;
  private dialog: MatDialog;
  private audioService: AudioService;
  private mobileNavMenuService: MobileNavMenuService;
  private mobileSoundboardMenuService: MobileSoundboardMenuService;
  private responsiveService: ResponsiveService;

  public isMobile: boolean = window.innerWidth <= 820;
  public currentRoute!: string;
  public title!: string;
  public allRoutes: string[] = ['ABOUT-ME', 'HOME', 'PROJECTS', 'CONTACT-ME'];
  public currentIndex: number = 0;

  constructor() {
    this.router = inject(Router);
    this.dialog = inject(MatDialog);
    this.audioService = inject(AudioService);
    this.mobileNavMenuService = inject(MobileNavMenuService);
    this.mobileSoundboardMenuService = inject(MobileSoundboardMenuService);
    this.responsiveService = inject(ResponsiveService);
  }

  ngOnInit() {
    this.currentRoute = this.router.url;
    this.title = this.currentRoute.slice(1).toUpperCase();

    const routeExist = (element: string) => element === this.title;
    if (!this.allRoutes.some(routeExist)) this.title = 'SECRET PLACE?';

    this.setCurrentIndexByRoute();

    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = this.router.url;
        this.title = this.currentRoute.slice(1).toUpperCase();
        if (!this.allRoutes.some(routeExist)) this.title = 'SECRET PLACE?';
        this.setCurrentIndexByRoute();
      }
    });

    this.responsiveService.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
      if (!this.isMobile) {
        if (this.mobileNavMenuService.mobileNavMenu)
          if (this.mobileNavMenuService.mobileNavMenu.opened)
            this.mobileNavMenuService.toggleMobileNavMenu();

        if (this.mobileSoundboardMenuService.mobileSoundboardMenu)
          if (this.mobileSoundboardMenuService.mobileSoundboardMenu.opened)
            this.mobileSoundboardMenuService.toggleMobileSoundboardMenu();
      }
    });
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

  private setCurrentIndexByRoute() {
    const currentRoute = this.router.url.replace('/', '');
    const index = this.allRoutes.findIndex(
      (r) => r.toLowerCase() === currentRoute.toLowerCase()
    );
    this.currentIndex = index >= 0 ? index : 0;
  }
  public goToPrevious() {
    const prevIndex =
      (this.currentIndex - 1 + this.allRoutes.length) % this.allRoutes.length;
    this.router.navigate([this.allRoutes[prevIndex].toLowerCase()]);
  }
  public goToNext() {
    const nextIndex = (this.currentIndex + 1) % this.allRoutes.length;
    this.router.navigate([this.allRoutes[nextIndex].toLowerCase()]);
  }
  public getCurrentRoute(): string {
    return this.allRoutes[this.currentIndex];
  }

  public playClickSound() {
    this.audioService.playClickSound('The Witcher 3');
  }

  public openThemesDialog() {
    this.dialog.open(DialogsComponent, {
      data: {
        dialogType: 'Themes',
      },
    });
  }

  public openLangsDialog() {
    this.dialog.open(DialogsComponent, {
      data: {
        dialogType: 'Langs',
      },
    });
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
}
