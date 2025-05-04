export type Games =
  | 'God Of War'
  | 'Red Dead Redemption 2'
  | 'The Witcher 3'
  | 'The Legend of Zelda: BOTW'
  | 'Cyberpunk'
  | 'Elden Ring'
  | 'Stardew Valley'
  | 'Hollow Knight'
  | 'Undertale'
  | 'Minecraft';
export type Colors = 'Light' | 'Dark' | 'Cosmic';

export type ThemeCategory = Games | Colors;
export interface Themes {
  name: ThemeCategory;
  type: 'Games' | 'Colors';
}
export const gamesOptions: Themes[] = [
  // {
  //   name: 'God of War',
  // },
  // {
  //   name: 'Red Dead Redemption 2',
  //   type: 'Games',
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
  // {
  //   name: 'The Legend of Zelda: BOTW',
  //   type: 'Games',
  // },
  // {
  //   name: 'Stardew Valley',
  //   type: 'Games',
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
