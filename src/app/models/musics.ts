import { Games } from './themes';
export interface Musics {
  gameName: Games;
  musicName: string;
  musicComposer: string;
  musicURL: string;
}

export const minecraftMusics: Musics[] = [
  {
    gameName: 'Minecraft',
    musicName: 'Aria Mat',
    musicComposer: 'C418',
    musicURL: 'assets/sounds/games/minecraft/music/c418-aria-math.ogg',
  },
  {
    gameName: 'Minecraft',
    musicName: 'Mice on Venus',
    musicComposer: 'C418',
    musicURL: 'assets/sounds/games/minecraft/music/c418-mice-on-venus.ogg',
  },
  {
    gameName: 'Minecraft',
    musicName: 'Subwoofer Lullaby',
    musicComposer: 'C418',
    musicURL: 'assets/sounds/games/minecraft/music/c418-subwoofer-lullaby.ogg',
  },
  {
    gameName: 'Minecraft',
    musicName: 'Moog City',
    musicComposer: 'C418',
    musicURL: 'assets/sounds/games/minecraft/music/c418-moog-city.ogg',
  },
  {
    gameName: 'Minecraft',
    musicName: 'Pigstep',
    musicComposer: 'Lena Raine',
    musicURL: 'assets/sounds/games/minecraft/music/lena-raine-pigstep.ogg',
  },
];

export const TW3Musics: Musics[] = [
  {
    gameName: 'The Witcher 3',
    musicName: 'Kaer Morhen',
    musicComposer: 'Marcin Przybyłowicz',
    musicURL: 'assets/sounds/games/the-witcher-3/music/kaer-morhen.ogg',
  },
  {
    gameName: 'The Witcher 3',
    musicName: 'Silver For Monsters...',
    musicComposer: 'Percival  & Marcin',
    musicURL: 'assets/sounds/games/the-witcher-3/music/silver-for-monsters.ogg',
  },
  {
    gameName: 'The Witcher 3',
    musicName: '... Steel For Humans',
    musicComposer: 'Percival & Marcin',
    musicURL: 'assets/sounds/games/the-witcher-3/music/steel-for-humans.ogg',
  },
  {
    gameName: 'The Witcher 3',
    musicName: 'The Fields of Ard Skellig',
    musicComposer: 'Percival & Marcin',
    musicURL:
      'assets/sounds/games/the-witcher-3/music/the-fields-of-ard-skellig.ogg',
  },
  {
    gameName: 'The Witcher 3',
    musicName: `Drink Up, There's More!`,
    musicComposer: 'Percival Schuttenbach',
    musicURL:
      'assets/sounds/games/the-witcher-3/music/drink-up-theres-more.ogg',
  },
];
