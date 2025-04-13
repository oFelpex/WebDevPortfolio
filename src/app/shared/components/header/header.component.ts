import { Component, inject } from '@angular/core';

import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';

import { MobileNavMenuService } from '../../../services/mobile-menu-service/mobile-nav-menu.service';
import { ResponsiveService } from '../../../services/responsive-service/responsive.service';

@Component({
  selector: 'app-header',
  imports: [NavBarComponent, MobileMenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private mobileMenuService: MobileNavMenuService;
  private responsiveService: ResponsiveService;

  public isMobile: boolean = window.innerWidth <= 820;

  constructor() {
    this.mobileMenuService = inject(MobileNavMenuService);
    this.responsiveService = inject(ResponsiveService);
  }

  ngOnInit() {
    this.responsiveService.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
      if (!this.isMobile && this.mobileMenuService.mobileNavMenu)
        if (this.mobileMenuService.mobileNavMenu.opened)
          this.mobileMenuService.toggleMobileMenu();
    });
  }
}
