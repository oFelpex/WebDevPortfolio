import { Injectable } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root',
})
export class MobileSoundboardMenuService {
  public mobileSoundboardMenu!: MatDrawer;

  public setMobileSoundboardDrawer(mobileMenu: MatDrawer) {
    this.mobileSoundboardMenu = mobileMenu;
  }

  public changeMobileSoundboardPointerEvents() {
    if (this.mobileSoundboardMenu) {
      if (this.mobileSoundboardMenu.opened) {
        (
          document.getElementById('mobileSoundboard-container') as HTMLElement
        ).style.pointerEvents = 'all';
      } else {
        (
          document.getElementById('mobileSoundboard-container') as HTMLElement
        ).style.pointerEvents = 'none';
      }
    }
  }

  public toggleMobileSoundboardMenu() {
    if (this.mobileSoundboardMenu) {
      this.mobileSoundboardMenu.toggle();
      this.changeMobileSoundboardPointerEvents();
    }
  }
}
