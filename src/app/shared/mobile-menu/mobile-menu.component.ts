import { Component, OnInit } from '@angular/core';
import { MobileMenuService } from '../../services/mobile-menu-service/mobile-menu.service';

import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-mobile-menu',
  imports: [MatSidenavModule],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.scss',
})
export class MobileMenuComponent implements OnInit {
  menuOpen = false;
  constructor(public mobileMenuService: MobileMenuService) {}

  ngOnInit() {
    this.mobileMenuService.menuOpen$.subscribe((state) => {
      this.menuOpen = state;
    });
  }
}
