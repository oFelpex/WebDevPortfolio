import { Component, inject, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';

import { LogoEffectsComponent } from '../../../../../logo-effects/logo-effects.component';
@Component({
  selector: 'app-tw3-header',
  imports: [MatButtonModule, LogoEffectsComponent],
  templateUrl: './tw3-header.component.html',
  styleUrl: './tw3-header.component.scss',
})
export class Tw3NavBarComponent implements OnInit, OnDestroy {
  private router: Router;
  private routerSubscription!: Subscription;
  public currentRoute!: string;
  public title!: string;
  public allRoutes: string[] = ['ABOUT-ME', 'HOME', 'PROJECTS', 'CONTACT-ME'];
  public currentIndex: number = 0;

  constructor() {
    this.router = inject(Router);
  }

  ngOnInit() {
    this.currentRoute = this.router.url;
    this.title = this.currentRoute.slice(1).toUpperCase();
    this.setCurrentIndexByRoute();

    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = this.router.url;
        this.title = this.currentRoute.slice(1).toUpperCase();
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
}
