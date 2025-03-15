import { Injectable } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MobileMenuService {
  private menuState = new BehaviorSubject<boolean>(false);
  private mobileMenu!: MatDrawer;

  setDrawer(mobileMenu: MatDrawer) {
    this.mobileMenu = mobileMenu;
  }
  changePointerEvents() {
    if (this.mobileMenu) {
      if (this.mobileMenu.opened) {
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
  toggleMobileMenu() {
    if (this.mobileMenu) {
      this.mobileMenu.toggle();
      this.changePointerEvents();
    }
  }
}
