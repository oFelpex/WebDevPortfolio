import {
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  output,
  Signal,
  signal,
} from '@angular/core';
import { AudioService } from '../../../../../../services/audio-service/audio.service';
import {
  Musics,
  undertaleMusics,
  undertaleSoundboardMenuOnly,
} from '../../../../../../models/musics';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { fadeIn_fadeOut_longer } from '../../../../../../shared/animations/fade-animations';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-undertale-home-soundboard',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatSliderModule,
  ],
  templateUrl: './undertale-home-soundboard.component.html',
  styleUrl: './undertale-home-soundboard.component.scss',
  animations: [fadeIn_fadeOut_longer],
})
export class UndertaleHomeSoundboardComponent implements OnInit, OnDestroy {
  private audioService: AudioService;
  private currentMusicIndex = signal(0);
  private soundboardMusic: Musics = undertaleSoundboardMenuOnly;

  public allUndertaleMusics: Musics[] = undertaleMusics;
  public exit = output<void>();
  public progress!: Signal<number>;
  public currentMusic!: Signal<string | null>;
  public currentComposer!: Signal<string | undefined>;
  public isPlaying!: Signal<boolean>;

  constructor() {
    this.audioService = inject(AudioService);
  }

  async ngOnInit(): Promise<void> {
    this.progress = this.audioService.progress;
    this.currentMusic = this.audioService.currentMusicName;
    this.currentComposer = this.audioService.currentMusicComposer;
    this.isPlaying = this.audioService.isPlaying;

    this.audioService.loadPlaylist(this.allUndertaleMusics);

    await this.audioService.preloadSound(
      this.soundboardMusic.musicName,
      this.soundboardMusic.musicURL,
    );

    this.audioService.playSingleTrack(this.soundboardMusic, true);
  }
  ngOnDestroy(): void {
    this.audioService.unloadOneSound(this.soundboardMusic);

    this.audioService.unloadCurrentPlaylist();
  }

  public get isPlayingSomeMusicFromThePlaylist(): boolean {
    return this.audioService.isPlayingFromThePlaylist();
  }
  public get musicVolume(): number {
    return this.audioService.getMusicVolume();
  }
  public setMusicVolume(volume: number) {
    this.audioService.setMusicVolume(volume);
  }
  public get sfxVolume(): number {
    return this.audioService.getSfxVolume();
  }
  public setSfxVolume(volume: number) {
    this.audioService.setSfxVolume(volume);
  }
  public playPreviousMusic(): void {
    this.audioService.previousMusic();
  }
  public pauseOrPlayMusic(): void {
    this.audioService.isPlaying()
      ? this.audioService.pauseMusic()
      : this.audioService.resumeMusic();
  }
  public playNextMusic(): void {
    this.audioService.nextMusic();
  }

  public onExit(): void {
    this.exit.emit();
  }
  public mouseEnterOrLeaveSFX(): void {
    this.audioService.playSound('Undertale-mouseEnterOrLeave');
  }
  public playClickSound(): void {
    this.audioService.playClickSound('Undertale');
  }

  public visibleMusics = computed(() => {
    const list = this.allUndertaleMusics;
    const start = this.currentMusicIndex();

    return [
      list[start % list.length],
      list[(start + 1) % list.length],
      list[(start + 2) % list.length],
    ];
  });

  public nextMusicOnTheList(): void {
    this.currentMusicIndex.update(
      (index) => (index + 1) % this.allUndertaleMusics.length,
    );
  }

  public prevMusicOnTheList(): void {
    this.currentMusicIndex.update(
      (index) =>
        (index - 1 + this.allUndertaleMusics.length) %
        this.allUndertaleMusics.length,
    );
  }

  public playPlaylistStartingOnThisOne(music: Musics) {
    const index = this.allUndertaleMusics.findIndex((m) => m === music);

    if (index !== -1) {
      this.audioService.playFromIndex(index);
    }
  }
}
