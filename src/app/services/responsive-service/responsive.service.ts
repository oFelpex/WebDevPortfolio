import { Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime, fromEvent, map, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResponsiveService {
  private isMobileSubject = new BehaviorSubject<boolean>(
    window.innerWidth <= 820
  );
  isMobile$ = this.isMobileSubject.asObservable();

  constructor() {
    fromEvent(window, 'resize')
      .pipe(
        debounceTime(200),
        map((event: any) => event.target.innerWidth <= 820),
        startWith(window.innerWidth <= 820)
      )
      .subscribe(this.isMobileSubject);
  }
}
