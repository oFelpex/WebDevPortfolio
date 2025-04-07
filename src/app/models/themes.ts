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
}
export const gamesOptions: Themes[] = [
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
export const colorsOptions: Themes[] = [
  { name: 'Light' },
  { name: 'Dark' },
  { name: 'Cosmic' },
];
export const defaultTheme: Themes = {
  name: 'Light',
};
