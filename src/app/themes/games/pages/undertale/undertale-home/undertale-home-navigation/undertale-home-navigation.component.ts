import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AudioService } from '../../../../../../services/audio-service/audio.service';
import {
  Musics,
  undertaleNavigationMenuOnly,
} from '../../../../../../models/musics';
import { fadeIn_fadeOut_longer } from '../../../../../../shared/animations/fade-animations';

type UndertaleLocations = 'Snowdin' | 'Waterfall' | 'The Core' | 'Hotland';
@Component({
  selector: 'app-undertale-home-navigation',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './undertale-home-navigation.component.html',
  styleUrl: './undertale-home-navigation.component.scss',
  animations: [fadeIn_fadeOut_longer],
})
export class UndertaleHomeNavigationComponent implements OnInit, OnDestroy {
  private audioService: AudioService;
  private undertaleNavigationMusics: Musics[] = undertaleNavigationMenuOnly;
  private LOCATIONS: readonly UndertaleLocations[] = [
    'Snowdin',
    'Waterfall',
    'Hotland',
    'The Core',
  ];

  public currentLocation = signal<UndertaleLocations>('Snowdin');

  constructor() {
    this.audioService = inject(AudioService);
  }

  async ngOnInit(): Promise<void> {
    await Promise.all(
      this.undertaleNavigationMusics.map((music) =>
        this.audioService.preloadSound(music.musicName, music.musicURL),
      ),
    );

    this.playLocationMusic();
  }
  ngOnDestroy(): void {
    this.undertaleNavigationMusics.map((music) => {
      this.audioService.unloadOneSound(music);
    });
  }

  public playClickSound(): void {
    this.audioService.playClickSound('Undertale');
  }
  public mouseEnterOrLeaveSFX(): void {
    this.audioService.playSound('Undertale-mouseEnterOrLeave');
  }

  private playLocationMusic(): void {
    const currentIndex: number = this.LOCATIONS.indexOf(this.currentLocation());
    this.audioService.playSingleTrack(
      this.undertaleNavigationMusics[currentIndex],
      true,
    );
  }

  public changeToNextLocation(nextOrPrevious: 'next' | 'previous'): void {
    const currentIndex: number = this.LOCATIONS.indexOf(this.currentLocation());

    const newIndex: number =
      nextOrPrevious === 'next'
        ? (currentIndex + 1) % this.LOCATIONS.length
        : (currentIndex - 1 + this.LOCATIONS.length) % this.LOCATIONS.length;

    this.currentLocation.set(this.LOCATIONS[newIndex]);
    this.playLocationMusic();
  }
}
