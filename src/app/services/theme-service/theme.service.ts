import { Injectable } from '@angular/core';
import { Themes } from '../../models/themes';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private gamesOptions: Themes[] = [
    {
      name: 'God Of War',
    },
    {
      name: 'The Witcher 3',
    },
    {
      name: 'Cyberpunk',
    },
    {
      name: 'Elden Ring',
    },
    {
      name: 'Hollow Knight',
    },
    {
      name: 'Undertale',
    },
    {
      name: 'Minecraft',
    },
  ];
  private seasonsOptions: Themes[] = [
    { name: 'Spring' },
    { name: 'Summer' },
    { name: 'Autumn' },
    { name: 'Fall' },
    { name: 'Winter' },
  ];
  private defaultTheme: Themes = {
    name: null,
  };
  private actualTheme: Themes = this.defaultTheme;

  getGamesNames(): Themes[] {
    return this.gamesOptions;
  }
  getSeasonsNames(): Themes[] {
    return this.seasonsOptions;
  }

  getNameOfActualThemeFromLocalStorage(): Themes {
    let storagedTheme = localStorage.getItem('actualTheme');
    if (storagedTheme) {
      this.actualTheme = JSON.parse(storagedTheme);
    } else {
      this.actualTheme = this.defaultTheme;
      this.setActualThemeToLocalStorage(this.actualTheme);
    }
    return this.actualTheme;
  }

  getTypeOfActualThemeFromLocalStorage(): string {
    const seasonThemes = this.getSeasonsNames();
    const gameThemes = this.getGamesNames();
    const actualTheme = this.getNameOfActualThemeFromLocalStorage().name;

    if (seasonThemes.some((theme) => theme.name === actualTheme))
      return 'Seasons';
    if (gameThemes.some((theme) => theme.name === actualTheme)) return 'Games';

    return 'Default';
  }

  private setActualThemeToLocalStorage(theme: Themes) {
    let hasSomethingInLocalStorage = localStorage.getItem('actualTheme');

    if (hasSomethingInLocalStorage) {
      JSON.parse(hasSomethingInLocalStorage).name !== theme.name
        ? (this.actualTheme = theme)
        : (this.actualTheme = this.defaultTheme);
      localStorage.setItem('actualTheme', JSON.stringify(this.actualTheme));
    } else {
      localStorage.setItem('actualTheme', JSON.stringify(theme));
    }
  }

  changeTheme(theme: Themes) {
    this.setActualThemeToLocalStorage(theme);

    //temporary
    setTimeout(() => {
      console.log(this.getNameOfActualThemeFromLocalStorage());
      console.log(this.getTypeOfActualThemeFromLocalStorage());
    }, 1000);
  }
}
