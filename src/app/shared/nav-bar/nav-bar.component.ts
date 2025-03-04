import { Component } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MobileMenuService } from '../../services/mobile-menu-service/mobile-menu.service';

@Component({
  selector: 'app-nav-bar',
  imports: [MatIconModule, MatButtonModule, MatSidenavModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  constructor(private mobileMenuService: MobileMenuService) {}

  toggleMenu() {
    this.mobileMenuService.toggleMenu();
  }
}
