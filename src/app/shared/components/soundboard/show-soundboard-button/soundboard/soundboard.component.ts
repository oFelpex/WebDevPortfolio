import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { Themes } from '../../../../../models/themes';
import { AudioService } from '../../../../../services/audio-service/audio.service';
import { ThemeService } from '../../../../../services/theme-service/theme.service';
import { TranslateModule } from '@ngx-translate/core';
import { fadeInDownToUp_fadeOutUpToDown_state } from '../../../../animations/fadeAndTranslate-animations';
@Component({
  selector: 'app-soundboard',
  imports: [
    MatSliderModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    TranslateModule,
  ],
  templateUrl: './soundboard.component.html',
  styleUrl: './soundboard.component.scss',
  animations: [fadeInDownToUp_fadeOutUpToDown_state],
})
export class SoundboardComponent implements OnInit, OnDestroy {
  @Input() showSoundboard: boolean = false;

  private audioService: AudioService;
  private themeService: ThemeService;
  private savedSfxVolume: number = 50;
  private savedMusicVolume: number = 50;
  private sub!: Subscription;

  public sfxVolume: number = 50;
  public musicVolume: number = 50;
  public progress: number = 0;
  public currentMusic: string | null = null;
  public currentComposer: string | undefined;

  constructor() {
    this.audioService = inject(AudioService);
    this.themeService = inject(ThemeService);

    this.sfxVolume = this.audioService.getSfxVolume() * 100;
    this.musicVolume = this.audioService.getMusicVolume() * 100;
  }

  ngOnInit(): void {
    this.sub = interval(200).subscribe(() => {
      this.progress = this.audioService.getMusicProgress();
      this.currentMusic = this.audioService.getCurrentMusicName();
      this.currentComposer = this.audioService.getCurrentMusicComposer();
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public get getNameOfActualThemeFromLocalStorage(): Themes {
    return this.themeService.getNameOfActualTheme();
  }
  public playClickSound(themeName: string) {
    this.audioService.playClickSound(themeName);
  }

  public previousMusic() {
    this.audioService.previousMusic();
  }
  public nextMusic() {
    this.audioService.nextMusic();
  }

  public isPlaying(): boolean {
    return this.audioService.isPlaying();
  }
  public playOrStopMusic() {
    this.audioService.isPlaying()
      ? this.audioService.pauseMusic()
      : this.audioService.resumeMusic();
  }

  public setSfxVolume(sliderValue: string) {
    this.sfxVolume = Number(sliderValue);
    this.audioService.setSfxVolume(this.sfxVolume / 100);
  }

  public setMusicVolume(sliderValue: string) {
    this.musicVolume = Number(sliderValue);
    this.audioService.setMusicVolume(this.musicVolume / 100);
  }

  public muteSfxVolume() {
    if (this.sfxVolume === 0) {
      this.setSfxVolume(String(this.savedSfxVolume));
      this.sfxVolume = this.savedSfxVolume;
    } else {
      this.savedSfxVolume = this.sfxVolume;
      this.setSfxVolume('0');
      this.sfxVolume = 0;
    }
  }

  public muteMusicVolume() {
    if (this.musicVolume === 0) {
      this.setMusicVolume(String(this.savedMusicVolume));
      this.musicVolume = this.savedMusicVolume;
    } else {
      this.savedMusicVolume = this.musicVolume;
      this.setMusicVolume('0');
      this.musicVolume = 0;
    }
  }

  public formatLabel(value: number): string {
    return `${value}`;
  }
}
