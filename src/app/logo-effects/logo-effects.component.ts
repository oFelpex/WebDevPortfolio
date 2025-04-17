import { Component, inject, ViewChild } from '@angular/core';

import { Themes } from '../models/themes';
import { ThemeService } from '../services/theme-service/theme.service';

import { TranslateModule } from '@ngx-translate/core';

import { MatTooltipModule } from '@angular/material/tooltip';

import { MinecraftEffectComponent } from './effects/Games/Minecraft/minecraft-effect.component';
import { TheWitcher3EffectComponent } from './effects/Games/The Witcher 3/the-witcher-3-effect.component';

@Component({
  selector: 'app-logo-effects',
  imports: [
    MatTooltipModule,
    TranslateModule,
    MinecraftEffectComponent,
    TheWitcher3EffectComponent,
  ],
  templateUrl: './logo-effects.component.html',
  styleUrl: './logo-effects.component.scss',
})
export class LogoEffectsComponent {
  @ViewChild('minecraftEffect') minecraftEffect!: MinecraftEffectComponent;

  private themeService: ThemeService;

  constructor() {
    this.themeService = inject(ThemeService);
  }

  public get getNameOfActualThemeFromLocalStorage(): Themes {
    return this.themeService.getNameOfActualTheme();
  }
  public get getTypeOfActualThemeFromLocalStorage(): string {
    return this.themeService.getTypeOfActualTheme();
  }

  public playEffect({ name }: Themes) {
    switch (name) {
      case 'God Of War':
        break;
      case 'The Witcher 3':
        break;
      case 'Cyberpunk':
        break;
      case 'Elden Ring':
        break;
      case 'Hollow Knight':
        break;
      case 'Undertale':
        break;
      case 'Minecraft':
        this.minecraftEffect.summonTnt();
        break;
      default:
        console.log('Error with playEffect()');
        return;
    }
  }
}
