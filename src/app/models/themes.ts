type Games =
  | 'God Of War'
  | 'The Witcher 3'
  | 'Cyberpunk'
  | 'Elden Ring'
  | 'Hollow Knight'
  | 'Undertale'
  | 'Minecraft';
type Colors = 'Light' | 'Dark' | 'Cosmic';

export type ThemeCategory = Games | Colors;
export interface Themes {
  name: ThemeCategory;
  type: 'Games' | 'Colors';
}
export const gamesOptions: Themes[] = [
  // {
  //   name: 'God Of War',
  // },
  {
    name: 'The Witcher 3',
    type: 'Games',
  },
  // {
  //   name: 'Cyberpunk',
  //   type: 'Games'
  // },
  // {
  //   name: 'Elden Ring',
  //   type: 'Games'
  // },
  // {
  //   name: 'Hollow Knight',
  //   type: 'Games'
  // },
  // {
  //   name: 'Undertale',
  //   type: 'Games'
  // },
  {
    name: 'Minecraft',
    type: 'Games',
  },
];
export const colorsOptions: Themes[] = [
  { name: 'Light', type: 'Colors' },
  { name: 'Dark', type: 'Colors' },
  { name: 'Cosmic', type: 'Colors' },
];
export const defaultTheme: Themes = {
  name: 'Light',
  type: 'Colors',
};
