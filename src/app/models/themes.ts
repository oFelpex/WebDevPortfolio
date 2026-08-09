export type Games =
  | 'Red Dead Redemption 2'
  | 'The Witcher 3' // Work in progress
  | 'The Legend of Zelda: BOTW' // Not sure, but might be Zelda in general
  | 'Persona 3' // Could be Persona 5, still thinking about it
  | 'Elden Ring' // It might be Dark Souls instead
  | 'Hollow Knight'
  | 'Undertale'
  | 'Minecraft'; // Done!
export type Colors = 'Light' | 'Dark' | 'Cosmic';

export type ThemeCategory = Games | Colors;
export interface Themes {
  name: ThemeCategory;
  type: 'Games' | 'Colors';
}
export const gamesOptions: Themes[] = [
  {
    name: 'Red Dead Redemption 2',
    type: 'Games',
  },
  {
    name: 'The Witcher 3',
    type: 'Games',
  },
  {
    name: 'The Legend of Zelda: BOTW',
    type: 'Games',
  },
  {
    name: 'Persona 3',
    type: 'Games',
  },
  {
    name: 'Elden Ring',
    type: 'Games',
  },
  {
    name: 'Hollow Knight',
    type: 'Games',
  },
  {
    name: 'Undertale',
    type: 'Games',
  },
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
