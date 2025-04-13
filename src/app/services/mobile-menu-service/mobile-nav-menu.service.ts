import { Injectable } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MobileNavMenuService {
  public mobileNavMenu!: MatDrawer;

  public setDrawer(mobileMenu: MatDrawer) {
    this.mobileNavMenu = mobileMenu;
  }

  public changePointerEvents() {
    if (this.mobileNavMenu) {
      if (this.mobileNavMenu.opened) {
        (
          document.querySelector('.mat-drawer-container') as HTMLElement
        ).style.pointerEvents = 'all';
      } else {
        (
          document.querySelector('.mat-drawer-container') as HTMLElement
        ).style.pointerEvents = 'none';
      }
    }
  }

  public toggleMobileMenu() {
    if (this.mobileNavMenu) {
      this.mobileNavMenu.toggle();
      this.changePointerEvents();
    }
  }
}
