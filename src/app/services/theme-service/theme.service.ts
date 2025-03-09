import { Injectable } from '@angular/core';
import { defaultTheme, seasonsOptions, Themes } from '../../models/themes';
import { gamesOptions } from '../../models/themes';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private gamesOptions: Themes[] = gamesOptions;
  private seasonsOptions: Themes[] = seasonsOptions;
  private defaultTheme: Themes = defaultTheme;

  private _actualTheme$ = new BehaviorSubject<Themes>(this.defaultTheme);
  actualTheme$ = this._actualTheme$.asObservable();

  constructor() {
    this.initTheme();
  }

  private initTheme() {
    const storagedTheme = localStorage.getItem('actualTheme');
    if (storagedTheme) {
      const parsedTheme: Themes = JSON.parse(storagedTheme);
      if (
        this.seasonsOptions.some((seasonsThemes) => {
          seasonsThemes === parsedTheme;
        }) ||
        this.gamesOptions.some((gamesThemes) => {
          gamesThemes === parsedTheme;
        })
      ) {
        this._actualTheme$.next(parsedTheme);
      } else {
        this._actualTheme$.next(this.defaultTheme);
        this.setActualThemeToLocalStorage(this.defaultTheme);
      }
    } else {
      this._actualTheme$.next(this.defaultTheme);
      this.setActualThemeToLocalStorage(this.defaultTheme);
    }
  }

  public getGamesNames(): Themes[] {
    return this.gamesOptions;
  }

  public getSeasonsNames(): Themes[] {
    return this.seasonsOptions;
  }

  public getNameOfActualTheme(): Themes {
    return this._actualTheme$.value;
  }

  public getTypeOfActualTheme(): string {
    const seasonThemes = this.getSeasonsNames();
    const gameThemes = this.getGamesNames();
    const actualThemeName = this.getNameOfActualTheme().name;

    if (seasonThemes.some((theme) => theme.name === actualThemeName)) {
      return 'Seasons';
    }

    if (gameThemes.some((theme) => theme.name === actualThemeName)) {
      return 'Games';
    }

    return 'Default';
  }

  public changeTheme(theme: Themes) {
    const currentTheme = this._actualTheme$.value;

    if (currentTheme.name === theme.name) {
      this._actualTheme$.next(this.defaultTheme);
      this.setActualThemeToLocalStorage(this.defaultTheme);
    } else {
      this._actualTheme$.next(theme);
      this.setActualThemeToLocalStorage(theme);
    }

    // Just for debug
    console.log('Actual Theme:', this.getNameOfActualTheme());
    console.log('Type:', this.getTypeOfActualTheme());
  }

  private setActualThemeToLocalStorage(theme: Themes) {
    localStorage.setItem('actualTheme', JSON.stringify(theme));
  }
}
