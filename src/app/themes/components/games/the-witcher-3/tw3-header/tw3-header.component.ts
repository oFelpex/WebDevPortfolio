import { Component, inject, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

import { LogoEffectsComponent } from '../../../../../logo-effects/logo-effects.component';
import { DialogsComponent } from './dialogs/dialogs.component';
import { AudioService } from '../../../../../services/audio-service/audio.service';
@Component({
  selector: 'app-tw3-header',
  imports: [MatButtonModule, LogoEffectsComponent],
  templateUrl: './tw3-header.component.html',
  styleUrl: './tw3-header.component.scss',
})
export class Tw3NavBarComponent implements OnInit, OnDestroy {
  private router: Router;
  private routerSubscription!: Subscription;
  private dialog: MatDialog;
  private audioService: AudioService;
  public currentRoute!: string;
  public title!: string;
  public allRoutes: string[] = ['ABOUT-ME', 'HOME', 'PROJECTS', 'CONTACT-ME'];
  public currentIndex: number = 0;

  constructor() {
    this.router = inject(Router);
    this.dialog = inject(MatDialog);
    this.audioService = inject(AudioService);
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
}
