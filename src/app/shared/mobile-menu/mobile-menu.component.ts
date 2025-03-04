import { Component, OnInit, ViewChild } from '@angular/core';
import { MobileMenuService } from '../../services/mobile-menu-service/mobile-menu.service';

import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-mobile-menu',
  imports: [MatSidenavModule],
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
}
