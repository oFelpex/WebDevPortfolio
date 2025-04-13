import { Injectable } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root',
})
export class MobileNavMenuService {
  public mobileNavMenu!: MatDrawer;

  public setMobileNavDrawer(mobileMenu: MatDrawer) {
    this.mobileNavMenu = mobileMenu;
  }

  public changeMobileNavPointerEvents() {
    if (this.mobileNavMenu) {
      if (this.mobileNavMenu.opened) {
        (
          document.getElementById('mobileMenu-container') as HTMLElement
        ).style.pointerEvents = 'all';
      } else {
        (
          document.getElementById('mobileMenu-container') as HTMLElement
        ).style.pointerEvents = 'none';
      }
    }
  }

  public toggleMobileNavMenu() {
    if (this.mobileNavMenu) {
      this.mobileNavMenu.toggle();
      this.changeMobileNavPointerEvents();
    }
  }
}
