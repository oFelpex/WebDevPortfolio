import { Component, inject } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { Themes } from '../../../../../../../models/themes';
import { AudioService } from '../../../../../../../services/audio-service/audio.service';
import { ThemeService } from '../../../../../../../services/theme-service/theme.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSliderModule } from '@angular/material/slider';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-minecraft-dialog-soundboard',
  imports: [
    MatSliderModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    TranslateModule,
  ],
  templateUrl: './minecraft-dialog-soundboard.component.html',
  styleUrl: './minecraft-dialog-soundboard.component.scss',
})
export class MinecraftDialogSoundboardComponent {
  private audioService: AudioService;
  private themeService: ThemeService;
  private savedSfxVolume: number = 50;
  private savedMusicVolume: number = 50;
  private sub!: Subscription;
  private themeSubscription!: Subscription;

  public actualTheme!: Themes;
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

    this.themeSubscription = this.themeService.actualTheme$.subscribe(
      (theme) => {
        this.actualTheme = theme;
      }
    );

    this.addStylesToSliders();
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
    this.sub.unsubscribe();
  }

  private addStylesToSliders(): void {
    const sliders = document.getElementsByClassName(
      'minecraft-sb-slider'
    ) as HTMLCollectionOf<HTMLElement>;
    for (const slider of sliders) {
      const thumb = slider.querySelector(
        '.mdc-slider__thumb-knob'
      ) as HTMLElement;
      if (thumb) {
        thumb.style.border = '3px solid black';
      }

      const trackActive = slider.querySelector(
        '.mdc-slider__track--active_fill'
      ) as HTMLElement;
      const track = slider.querySelector('.mdc-slider__track') as HTMLElement;

      slider.addEventListener('mouseover', () => {
        thumb.style.backgroundColor = '#43a01c';
        thumb.style.borderColor = '#fff';
        track.style.backgroundColor = '#037300';
        trackActive.style.borderColor = '#4e8836';
      });
      slider.addEventListener('mouseout', () => {
        thumb.style.backgroundColor = '';
        thumb.style.borderColor = 'black';
        track.style.backgroundColor = '';
        trackActive.style.borderColor = '';
      });
    }
  }

  public playClickSound(themeName: string): void {
    this.audioService.playClickSound(themeName);
  }

  public previousMusic(): void {
    this.audioService.previousMusic();
  }
  public nextMusic(): void {
    this.audioService.nextMusic();
  }

  public isPlaying(): boolean {
    return this.audioService.isPlaying();
  }
  public playOrStopMusic(): void {
    this.audioService.isPlaying()
      ? this.audioService.pauseMusic()
      : this.audioService.resumeMusic();
  }

  public setSfxVolume(sliderValue: string): void {
    this.sfxVolume = Number(sliderValue);
    this.audioService.setSfxVolume(this.sfxVolume / 100);
  }

  public setMusicVolume(sliderValue: string): void {
    this.musicVolume = Number(sliderValue);
    this.audioService.setMusicVolume(this.musicVolume / 100);
  }

  public muteSfxVolume(): void {
    if (this.sfxVolume === 0) {
      this.setSfxVolume(String(this.savedSfxVolume));
      this.sfxVolume = this.savedSfxVolume;
    } else {
      this.savedSfxVolume = this.sfxVolume;
      this.setSfxVolume('0');
      this.sfxVolume = 0;
    }
  }

  public muteMusicVolume(): void {
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
