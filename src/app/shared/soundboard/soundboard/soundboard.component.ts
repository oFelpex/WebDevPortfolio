import { Component, inject } from '@angular/core';

import { MatSliderModule } from '@angular/material/slider';

import { AudioService } from '../../../services/audio-service/audio.service';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Themes } from '../../../models/themes';
import { ThemeService } from '../../../services/theme-service/theme.service';
@Component({
  selector: 'app-soundboard',
  imports: [MatSliderModule, MatIcon, MatButtonModule],
  templateUrl: './soundboard.component.html',
  styleUrl: './soundboard.component.scss',
})
export class SoundboardComponent {
  private audioService: AudioService;
  private themeService: ThemeService;
  public sfxVolume: number = 50;
  public musicVolume: number = 50;

  constructor() {
    this.audioService = inject(AudioService);
    this.themeService = inject(ThemeService);

    this.sfxVolume = this.audioService.getSfxVolume();
    this.musicVolume = this.audioService.getMusicVolume();
  }

  public get getNameOfActualThemeFromLocalStorage(): Themes {
    return this.themeService.getNameOfActualTheme();
  }
  public playClickSound(themeName: string) {
    this.audioService.playClickSound(themeName);
  }

  public setSfxVolume(sliderValue: string) {
    this.sfxVolume = Number(sliderValue);
    this.audioService.setSfxVolume(this.sfxVolume / 100);
  }
  public setMusicVolume(sliderValue: string) {
    this.musicVolume = Number(sliderValue);
    this.audioService.setMusicVolume(this.musicVolume / 100);
  }

  public formatLabel(value: number): string {
    return `${value}`;
  }
}
