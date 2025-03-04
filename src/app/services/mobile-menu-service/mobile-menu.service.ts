import { Injectable, ViewChild } from '@angular/core';
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

  toggleMobileMenu() {
    if (this.mobileMenu) {
      this.mobileMenu.toggle();
    }
  }

  openMenu() {
    if (this.mobileMenu) {
      this.mobileMenu.open();
    }
  }

  closeMenu() {
    if (this.mobileMenu) {
      this.mobileMenu.close();
    }
  }

  setMenuState(state: boolean) {
    this.menuState.next(state);
  }
}
