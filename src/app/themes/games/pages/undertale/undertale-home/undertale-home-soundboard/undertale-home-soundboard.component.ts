import {
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { AudioService } from '../../../../../../services/audio-service/audio.service';
import {
  Musics,
  undertaleMusics,
  undertaleSoundboardMenuOnly,
} from '../../../../../../models/musics';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-undertale-home-soundboard',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './undertale-home-soundboard.component.html',
  styleUrl: './undertale-home-soundboard.component.scss',
})
export class UndertaleHomeSoundboardComponent implements OnInit, OnDestroy {
  private audioService: AudioService;
  private currentMusicIndex = signal(0);
  private soundboardMusic: Musics = undertaleSoundboardMenuOnly;
  public allUndertaleMusics: Musics[] = undertaleMusics;
  public exit = output<void>();

  constructor() {
    this.audioService = inject(AudioService);
  }

  async ngOnInit(): Promise<void> {
    //NEED TO MAKE THIS HAPPEN ONCE UNDERTALE THEME CAMES UP
    await this.audioService.loadPlaylist(this.allUndertaleMusics);

    await this.audioService.preloadSound(
      this.soundboardMusic.musicName,
      this.soundboardMusic.musicURL,
    );
    this.audioService.playSingleTrack(this.soundboardMusic, true);
  }
  ngOnDestroy(): void {
    this.audioService.unloadOneSound(this.soundboardMusic);
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

  public visibleItems = computed(() => {
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
