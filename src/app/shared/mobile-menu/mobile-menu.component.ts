import { Component, HostListener, inject, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MobileMenuService } from '../../services/mobile-menu-service/mobile-menu.service';

import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { ThemeService } from '../../services/theme-service/theme.service';

@Component({
  selector: 'app-mobile-menu',
  imports: [MatSidenavModule, MatListModule, RouterModule],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.scss',
})
export class MobileMenuComponent {
  @ViewChild('mobileMenu') mobileMenu!: MatDrawer;

  constructor(private mobileMenuService: MobileMenuService) {}

  ngAfterViewInit() {
    this.mobileMenuService.setDrawer(this.mobileMenu);
  }

  toggleFromComponent() {
    this.mobileMenuService.toggleMobileMenu();
  }

  private _bottomSheet = inject(MatBottomSheet);

  openThemeMenu(): void {
    this._bottomSheet.open(MobileThemeSheet);
  }
}

@Component({
  selector: 'mobile-theme-menu-bottom-sheet',
  template: ` <mat-nav-list>
    <h3>Choose a theme</h3>
    <mat-accordion>
      <mat-expansion-panel>
        <mat-expansion-panel-header>
          <mat-panel-title> Seasons </mat-panel-title>
        </mat-expansion-panel-header>
        <mat-list>
          @for (seasonsOptions of themeService.getSeasonsNames(); track $index)
          {
          <mat-list-item
            ><button>{{ seasonsOptions.name }}</button></mat-list-item
          >
          }
        </mat-list>
      </mat-expansion-panel>
      <mat-expansion-panel>
        <mat-expansion-panel-header>
          <mat-panel-title> Video Games </mat-panel-title>
        </mat-expansion-panel-header>
        <mat-list>
          @for (gamesOptions of themeService.getGamesNames(); track $index) {
          <mat-list-item
            ><button>{{ gamesOptions.name }}</button></mat-list-item
          >
          }
        </mat-list>
      </mat-expansion-panel>
    </mat-accordion></mat-nav-list
  >`,
  styles: ['h3 {padding-bottom: 20px}'],
  imports: [MatListModule, MatExpansionModule, MatButtonModule],
})
export class MobileThemeSheet {
  public themeService: ThemeService;
  constructor() {
    this.themeService = inject(ThemeService);
  }
  private _bottomSheetRef =
    inject<MatBottomSheetRef<MobileThemeSheet>>(MatBottomSheetRef);
  isMobile: boolean = window.innerWidth <= 768;

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = event.target.innerWidth <= 768;
    if (!this.isMobile) {
      this._bottomSheetRef.dismiss();
    }
  }
}
