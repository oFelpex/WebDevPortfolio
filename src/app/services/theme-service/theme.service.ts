import { Injectable, OnInit } from '@angular/core';
import { Games, Themes } from '../../models/themes';

@Injectable({
  providedIn: 'root',
})
export class ThemeService implements OnInit {
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

  ngOnInit(): void {
    let storagedTheme = localStorage.getItem('actualTheme');
    if (storagedTheme) {
      this.actualTheme = JSON.parse(storagedTheme);
    }
  }

  getGamesNames() {
    return this.gamesOptions;
  }
  getSeasonsNames() {
    return this.seasonsOptions;
  }

  changeTheme(theme: Themes) {
    console.log(theme);
  }
}
