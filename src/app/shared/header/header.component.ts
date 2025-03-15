import { Component, HostListener } from '@angular/core';

import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';

import { MobileMenuService } from '../../services/mobile-menu-service/mobile-menu.service';

@Component({
  selector: 'app-header',
  imports: [NavBarComponent, MobileMenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private mobileMenuService: MobileMenuService) {}
  isMobile: boolean = window.innerWidth <= 820;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = event.target.innerWidth <= 820;
    if (event.target.innerWidth <= 820) {
      if (!this.isMobile) {
        this.mobileMenuService.toggleMobileMenu();
      }
    }
  }
}
