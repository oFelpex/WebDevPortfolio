import { Component } from '@angular/core';

import { MobileMenuService } from '../../services/mobile-menu-service/mobile-menu.service';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    RouterModule,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  constructor(private mobileMenuService: MobileMenuService) {}

  toggleMobileMenu() {
    this.mobileMenuService.toggleMobileMenu();
  }
}
