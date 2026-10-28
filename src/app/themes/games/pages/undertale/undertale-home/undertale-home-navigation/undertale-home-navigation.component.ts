import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AudioService } from '../../../../../../services/audio-service/audio.service';
import {
  Musics,
  undertaleNavigationBirdTheme,
  undertaleNavigationMenuOnly,
} from '../../../../../../models/musics';
import { fadeIn_fadeOut_longer } from '../../../../../../shared/animations/fade-animations';
import { Router } from '@angular/router';
import { NavigationPages } from '../../../../../../models/navigationPages';

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
  private undertaleBirdTheme: Musics = undertaleNavigationBirdTheme;
  private router: Router;
  private timeOutForTheBirdMusic: any;
  private LOCATIONS: readonly UndertaleLocations[] = [
    'Snowdin',
    'Waterfall',
    'Hotland',
    'The Core',
  ];
  public readonly locationPages: Record<UndertaleLocations, string> = {
    Snowdin: 'Home',
    Waterfall: 'Projects',
    Hotland: 'About-me',
    'The Core': 'Contact-me',
  };
  public isFlying = signal(false);
  public currentLocation = signal<UndertaleLocations>('Snowdin');
  public exit = output<void>();

  constructor() {
    this.audioService = inject(AudioService);
    this.router = inject(Router);
  }

  async ngOnInit(): Promise<void> {
    await Promise.all(
      this.undertaleNavigationMusics.map((music) =>
        this.audioService.preloadSound(music.musicName, music.musicURL),
      ),
    );
    await this.audioService.preloadSound(
      this.undertaleBirdTheme.musicName,
      this.undertaleBirdTheme.musicURL,
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

  public startFlight(): void {
    this.isFlying.set(true);
    this.audioService.stopMusic();
    this.timeOutForTheBirdMusic = setTimeout(() => {
      this.audioService.playSingleTrack(this.undertaleBirdTheme);
    }, 1500);
  }
  public onFlightEnd(): void {
    clearTimeout(this.timeOutForTheBirdMusic);

    if (this.locationPages[this.currentLocation()] === 'Home') this.exit.emit();
    this.router.navigate([
      this.locationPages[this.currentLocation()].toLowerCase(),
    ]);
  }
}
