import { inject, Injectable } from '@angular/core';
import {
  colorsOptions,
  defaultTheme,
  seasonsOptions,
  Themes,
} from '../../models/themes';
import { gamesOptions } from '../../models/themes';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private gamesOptions: Themes[] = gamesOptions;
  private seasonsOptions: Themes[] = seasonsOptions;
  private colorsOptions: Themes[] = colorsOptions;
  private defaultTheme: Themes = defaultTheme;
  private snackBar: MatSnackBar;

  private _actualTheme$ = new BehaviorSubject<Themes>(this.defaultTheme);
  actualTheme$ = this._actualTheme$.asObservable();

  constructor() {
    this.initTheme();
    this.snackBar = inject(MatSnackBar);
  }

  private initTheme() {
    const storagedTheme = localStorage.getItem('actualTheme');
    if (storagedTheme) {
      const parsedTheme: Themes = JSON.parse(storagedTheme);
      if (
        this.seasonsOptions.some(
          (themes) => themes.name === parsedTheme.name
        ) ||
        this.gamesOptions.some((themes) => themes.name === parsedTheme.name) ||
        this.colorsOptions.some((themes) => themes.name === parsedTheme.name)
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

  public getColorsNames(): Themes[] {
    return this.colorsOptions;
  }

  public getNameOfActualTheme(): Themes {
    return this._actualTheme$.value;
  }

  public getTypeOfActualTheme(): string {
    const seasonThemes = this.getSeasonsNames();
    const gameThemes = this.getGamesNames();
    const colorThemes = this.getColorsNames();
    const actualThemeName = this.getNameOfActualTheme().name;

    if (seasonThemes.some((theme) => theme.name === actualThemeName)) {
      return 'Seasons';
    }

    if (gameThemes.some((theme) => theme.name === actualThemeName)) {
      return 'Games';
    }

    if (colorThemes.some((theme) => theme.name === actualThemeName)) {
      return 'Colors';
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
    this.snackBar.open(
      `Theme changed to ${this.getNameOfActualTheme()?.name || 'Default'}`,
      'Close',
      { duration: 4000 }
    );
    console.log('Actual Theme:', this.getNameOfActualTheme());
    console.log('Type:', this.getTypeOfActualTheme());
  }

  private setActualThemeToLocalStorage(theme: Themes) {
    localStorage.setItem('actualTheme', JSON.stringify(theme));
  }
}
