type Seasons = 'Spring' | 'Summer' | 'Autumn' | 'Fall' | 'Winter';
type Games =
  | 'God Of War'
  | 'The Witcher 3'
  | 'Cyberpunk'
  | 'Elden Ring'
  | 'Hollow Knight'
  | 'Undertale'
  | 'Minecraft';
type Colors = 'Light' | 'Dark' | 'Eclipse';

export type ThemeCategory = Seasons | Games | Colors;
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
export const seasonsOptions: Themes[] = [
  { name: 'Spring' },
  { name: 'Summer' },
  { name: 'Autumn' },
  { name: 'Fall' },
  { name: 'Winter' },
];
export const colorsOptions: Themes[] = [
  { name: 'Light' },
  { name: 'Dark' },
  { name: 'Eclipse' },
];
export const defaultTheme: Themes = {
  name: 'Light',
};
