import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MobileMenuService {
  private menuState = new BehaviorSubject<boolean>(false);
  menuOpen$ = this.menuState.asObservable();

  toggleMenu() {
    this.menuState.next(!this.menuState.value);
    console.log(this.menuState.value);
  }

  setMenuState(state: boolean) {
    this.menuState.next(state);
  }
}
