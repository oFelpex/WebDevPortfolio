export interface SFXs {
  SFXName: string;
  SFXURL: string;
}

export const minecraftSFX: SFXs[] = [
  {
    SFXName: 'Minecraft-clickSound',
    SFXURL: 'assets/sounds/games/minecraft/sfx/button-click.ogg',
  },
  {
    SFXName: 'Minecraft-tnt-activate',
    SFXURL: 'assets/sounds/games/minecraft/easter-egg/tnt-activate.ogg',
  },
  {
    SFXName: 'Minecraft-tnt-explosion',
    SFXURL: 'assets/sounds/games/minecraft/easter-egg/tnt-explosion.ogg',
  },
];

export const TW3SFX: SFXs[] = [
  {
    SFXName: 'TW3-igni',
    SFXURL: 'assets/sounds/games/the-witcher-3/easter-egg/igni-sfx.ogg',
  },
];
