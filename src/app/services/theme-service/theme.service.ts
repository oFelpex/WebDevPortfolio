import { inject, Injectable, Type } from '@angular/core';
import { colorsOptions, defaultTheme, Themes } from '../../models/themes';
import { gamesOptions } from '../../models/themes';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from '../../shared/components/custom-snackbar/custom-snackbar.component';
import { Tw3NavBarComponent } from '../../themes/components/games/the-witcher-3/tw3-header/tw3-header.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private gamesOptions: Themes[] = gamesOptions;
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
        this.gamesOptions.some((themes) => themes.name === parsedTheme.name) ||
        this.colorsOptions.some((themes) => themes.name === parsedTheme.name)
      ) {
        this._actualTheme$.next(parsedTheme);
        this.setTheme(parsedTheme.name.toLowerCase().replaceAll(' ', '-'));
      } else {
        this._actualTheme$.next(this.defaultTheme);
        this.setActualThemeToLocalStorage(this.defaultTheme);
        this.setTheme(
          this.defaultTheme.name.toLowerCase().replaceAll(' ', '-')
        );
      }
    } else {
      this._actualTheme$.next(this.defaultTheme);
      this.setActualThemeToLocalStorage(this.defaultTheme);
      this.setTheme(this.defaultTheme.name.toLowerCase().replaceAll(' ', '-'));
    }
  }

  public getGamesNames(): Themes[] {
    return this.gamesOptions;
  }

  public getColorsNames(): Themes[] {
    return this.colorsOptions;
  }

  public getNameOfActualTheme(): Themes {
    return this._actualTheme$.value;
  }

  public getTypeOfActualTheme(): string {
    const gameThemes = this.getGamesNames();
    const colorThemes = this.getColorsNames();
    const actualThemeName = this.getNameOfActualTheme().name;

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
      this.setTheme(this.defaultTheme.name.toLowerCase());
      this.snackBar.openFromComponent(CustomSnackbarComponent, {
        data: {
          message: 'SNACK-BAR.THEMES.DEFAULT-THEME',
          themeNameMessage: `THEMES.${this.getTypeOfActualTheme()}.${
            this.getNameOfActualTheme().name
          }`,
          theme: this.getNameOfActualTheme().name,
        },
        duration: 4000,
      });
      console.log('Actual Theme:', this.getNameOfActualTheme());
      console.log('Type:', this.getTypeOfActualTheme());
      return;
    } else {
      this._actualTheme$.next(theme);
      this.setActualThemeToLocalStorage(theme);
      this.setTheme(theme.name.toLowerCase().replaceAll(' ', '-'));
    }

    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      data: {
        message: 'SNACK-BAR.THEMES.CHANGE-THEME',
        themeNameMessage: `THEMES.${this.getTypeOfActualTheme()}.${
          this.getNameOfActualTheme().name
        }`,
        theme: this.getNameOfActualTheme().name,
      },
      duration: 4000,
    });

    //debug
    console.log('Actual Theme:', this.getNameOfActualTheme());
    console.log('Type:', this.getTypeOfActualTheme());
  }

  private setActualThemeToLocalStorage(theme: Themes) {
    localStorage.setItem('actualTheme', JSON.stringify(theme));
  }

  private setTheme(themeName: string): void {
    const body = document.body;
    const allThemes: Themes[] = [];
    allThemes.push(...this.gamesOptions, ...this.colorsOptions);

    const _allThemes = allThemes.map((obj) => {
      return { ...obj, nome: obj.name.toLowerCase().replaceAll(' ', '-') };
    });
    const themeClassNames = _allThemes
      .map((item) => `${item.nome}-theme`)
      .filter(Boolean);

    body.classList.remove(...themeClassNames);

    body.classList.add(`${themeName}-theme`);
  }

  public getNavbarComponent(): Type<any> {
    switch (this.getNameOfActualTheme().name) {
      case 'The Witcher 3':
        return Tw3NavBarComponent;
      default:
        return HeaderComponent;
    }
  }
}
