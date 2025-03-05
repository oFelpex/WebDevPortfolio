type Seasons = 'Spring' | 'Summer' | 'Autumn' | 'Fall' | 'Winter';
export type Games =
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
