import { Component, ViewChild } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MobileMenuService } from '../../services/mobile-menu-service/mobile-menu.service';

@Component({
  selector: 'app-nav-bar',
  imports: [MatIconModule, MatButtonModule, MatSidenavModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  constructor(private mobileMenuService: MobileMenuService) {}

  toggleMobileMenu() {
    this.mobileMenuService.toggleMobileMenu();
  }
}
