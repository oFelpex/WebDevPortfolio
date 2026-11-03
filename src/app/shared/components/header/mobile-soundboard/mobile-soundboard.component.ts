import {
  AfterViewChecked,
  Component,
  inject,
  OnDestroy,
  OnInit,
  Signal,
  ViewChild,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';

import { AudioService } from '../../../../services/audio-service/audio.service';
import { ThemeService } from '../../../../services/theme-service/theme.service';
import { MobileSoundboardMenuService } from '../../../../services/mobile-soundboard-menu/mobile-soundboard-menu.service';
import { Themes } from '../../../../models/themes';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Subscription } from 'rxjs';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-mobile-soundboard',
  imports: [
    MatSidenavModule,
    MatButtonModule,
    TranslateModule,
    MatSliderModule,
    MatIconModule,
    MatProgressBarModule,
    MatDividerModule,
  ],
  templateUrl: './mobile-soundboard.component.html',
  styleUrl: './mobile-soundboard.component.scss',
})
export class MobileSoundboardComponent
  implements OnInit, AfterViewChecked, OnDestroy
{
  @ViewChild('mobileSoundboard') mobileSoundboard!: MatDrawer;

  private mobileSoundboardMenuService: MobileSoundboardMenuService;
  private audioService: AudioService;
  private themeService: ThemeService;
  private savedSfxVolume: number = 50;
  private savedMusicVolume: number = 50;
  private themeSubscription!: Subscription;

  public actualTheme!: Themes;
  public sfxVolume: number = 50;
  public musicVolume: number = 50;

  public progress!: Signal<number>;
  public currentMusic!: Signal<string | null>;
  public currentComposer!: Signal<string | undefined>;
  public isPlaying!: Signal<boolean>;

  constructor() {
    this.mobileSoundboardMenuService = inject(MobileSoundboardMenuService);
    this.audioService = inject(AudioService);
    this.themeService = inject(ThemeService);

    this.sfxVolume = this.audioService.getSfxVolume() * 100;
    this.musicVolume = this.audioService.getMusicVolume() * 100;
  }

  ngOnInit(): void {
    this.progress = this.audioService.progress;
    this.currentMusic = this.audioService.currentMusicName;
    this.currentComposer = this.audioService.currentMusicComposer;
    this.isPlaying = this.audioService.isPlaying;

    this.themeSubscription = this.themeService.actualTheme$.subscribe(
      (theme) => {
        this.actualTheme = theme;
      },
    );

    this.addStylesToSliders();
  }

  ngAfterViewChecked() {
    this.mobileSoundboardMenuService.setMobileSoundboardDrawer(
      this.mobileSoundboard,
    );

    this.mobileSoundboardMenuService.changeMobileSoundboardPointerEvents();
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  private addStylesToSliders(): void {
    const sliders = document.getElementsByClassName(
      'sb-slider',
    ) as HTMLCollectionOf<HTMLElement>;

    if (this.actualTheme.name === 'Minecraft') {
      for (const slider of sliders) {
        const sliderBG = slider.querySelector('.slider-bg') as HTMLElement;
        if (sliderBG) {
          sliderBG.style.backgroundColor = 'black';
        }

        const thumb = slider.querySelector(
          '.mdc-slider__thumb-knob',
        ) as HTMLElement;
        if (thumb) {
          thumb.style.border = '3px solid black';
        }

        const trackActive = slider.querySelector(
          '.mdc-slider__track--active_fill',
        ) as HTMLElement;
        const track = slider.querySelector('.mdc-slider__track') as HTMLElement;

        slider.addEventListener('mouseover', () => {
          sliderBG.style.backgroundColor = '#fff';
          thumb.style.backgroundColor = '#43a01c';
          thumb.style.borderColor = '#fff';
          track.style.backgroundColor = '#037300';
          trackActive.style.borderColor = '#4e8836';
        });
        slider.addEventListener('mouseout', () => {
          sliderBG.style.backgroundColor = 'black';
          thumb.style.backgroundColor = '';
          thumb.style.borderColor = 'black';
          track.style.backgroundColor = '';
          trackActive.style.borderColor = '';
        });
      }
    }
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

  public playOrStopMusic() {
    if (this.isPlaying()) {
      this.audioService.pauseMusic();
      return;
    }

    if (this.audioService.hasCurrentTrack()) {
      this.audioService.resumeMusic();
    } else {
      this.audioService.playFromIndex(0);
    }
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
