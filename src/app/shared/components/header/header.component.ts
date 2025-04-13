import { Component, inject } from '@angular/core';

import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';
import { MobileSoundboardComponent } from './mobile-soundboard/mobile-soundboard.component';

import { MobileNavMenuService } from '../../../services/mobile-menu-service/mobile-nav-menu.service';
import { ResponsiveService } from '../../../services/responsive-service/responsive.service';
import { MobileSoundboardMenuService } from '../../../services/mobile-soundboard-menu/mobile-soundboard-menu.service';

@Component({
  selector: 'app-header',
  imports: [NavBarComponent, MobileMenuComponent, MobileSoundboardComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private mobileNavMenuService: MobileNavMenuService;
  private mobileSoundboardMenuService: MobileSoundboardMenuService;

  private responsiveService: ResponsiveService;
  public isMobile: boolean = window.innerWidth <= 820;

  constructor() {
    this.mobileNavMenuService = inject(MobileNavMenuService);
    this.mobileSoundboardMenuService = inject(MobileSoundboardMenuService);

    this.responsiveService = inject(ResponsiveService);
  }

  ngOnInit() {
    this.responsiveService.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
      if (!this.isMobile) {
        if (this.mobileNavMenuService.mobileNavMenu)
          if (this.mobileNavMenuService.mobileNavMenu.opened)
            this.mobileNavMenuService.toggleMobileNavMenu();

        if (this.mobileSoundboardMenuService.mobileSoundboardMenu)
          if (this.mobileSoundboardMenuService.mobileSoundboardMenu.opened)
            this.mobileSoundboardMenuService.toggleMobileSoundboardMenu();
      }
    });
  }
}
