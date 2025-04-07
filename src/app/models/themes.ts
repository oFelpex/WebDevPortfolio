type Seasons = 'Spring' | 'Summer' | 'Autumn' | 'Fall' | 'Winter';
type Games =
  | 'God Of War'
  | 'The Witcher 3'
  | 'Cyberpunk'
  | 'Elden Ring'
  | 'Hollow Knight'
  | 'Undertale'
  | 'Minecraft';
type Colors = 'Light' | 'Dark' | 'Cosmic';

export type ThemeCategory = Seasons | Games | Colors;
export interface Themes {
  name: ThemeCategory;
}
export const gamesOptions: Themes[] = [
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
