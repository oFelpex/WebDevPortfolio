import { Component, inject } from '@angular/core';

import { MobileMenuService } from '../../services/mobile-menu-service/mobile-menu.service';
import { Games, Themes } from '../../models/themes';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../../services/theme-service/theme.service';

@Component({
  selector: 'app-nav-bar',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    RouterModule,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  public themeService: ThemeService;
  private mobileMenuService: MobileMenuService;
  constructor() {
    this.mobileMenuService = inject(MobileMenuService);
    this.themeService = inject(ThemeService);
  }

  toggleMobileMenu() {
    this.mobileMenuService.toggleMobileMenu();
  }
}
