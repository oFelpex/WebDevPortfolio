import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tw3-header',
  imports: [MatButtonModule],
  templateUrl: './tw3-header.component.html',
  styleUrl: './tw3-header.component.scss',
})
export class Tw3NavBarComponent implements OnInit, OnDestroy {
  private router: Router;
  private routerSubscription!: Subscription;
  public currentRoute!: string;
  public title!: string;

  constructor() {
    this.router = inject(Router);
  }

  ngOnInit() {
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = this.router.url;
        this.title = this.currentRoute.slice(1).toUpperCase();
      }
    });
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
