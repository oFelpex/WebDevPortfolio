type Seasons = 'Spring' | 'Summer' | 'Autumn' | 'Fall' | 'Winter';

type Games =
  | 'God Of War'
  | 'The Witcher 3'
  | 'Cyberpunk'
  | 'Elden Ring'
  | 'Hollow Knight'
  | 'Undertale'
  | 'Minecraft';
export type ThemeCategory = Seasons | Games | null;
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
export const defaultTheme: Themes = {
  name: null,
};
