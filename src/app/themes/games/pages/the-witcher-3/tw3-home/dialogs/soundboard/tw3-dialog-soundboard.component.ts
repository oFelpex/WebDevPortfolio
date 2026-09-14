import {
  Component,
  ElementRef,
  inject,
  NgZone,
  signal,
  ViewChild,
} from '@angular/core';
import { Musics, TW3Musics } from '../../../../../../../models/musics';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
} from '@angular/material/dialog';
import { AudioService } from '../../../../../../../services/audio-service/audio.service';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBar } from '@angular/material/progress-bar';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-tw3-dialog-soundboard',
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatIconModule,
    MatProgressBar,
  ],
  templateUrl: './tw3-dialog-soundboard.component.html',
  styleUrl: './tw3-dialog-soundboard.component.scss',
})
export class Tw3DialogSoundboardComponent {
  @ViewChild('cardTarget', { static: true })
  cardTarget!: ElementRef<HTMLElement>;

  private ngZone = inject(NgZone);
  private audioService: AudioService;
  private currentCardClone: HTMLElement | null = null;
  private musicProgressSubscription!: Subscription;

  public tw3Musics: Musics[] = TW3Musics;
  public currentMusicProgress: number = 0;
  public currentMusicComposer: string | undefined;
  public selectedTrack = signal<Musics | null>(null);

  public isAnimating = signal(false);

  constructor() {
    this.audioService = inject(AudioService);
  }

  ngOnInit(): void {
    this.syncWithCurrentlyPlayingTrack();

    this.musicProgressSubscription = interval(200).subscribe(() => {
      this.currentMusicProgress = this.audioService.getMusicProgress();
      this.currentMusicComposer = this.audioService.getCurrentMusicComposer();

      const currentMusic = this.audioService.getCurrentMusic();

      if (currentMusic && currentMusic !== this.selectedTrack()) {
        this.selectedTrack.set(currentMusic);
        this.placeCardInTarget(currentMusic);
      } else if (!currentMusic) {
        this.selectedTrack.set(null);
      }
    });
  }
  ngOnDestroy(): void {
    this.musicProgressSubscription.unsubscribe();
  }

  public get isPlayingMusic(): boolean {
    return this.audioService.isPlaying();
  }
  public get currentMusicName(): string {
    return this.selectedTrack()?.musicName || '';
  }

  public pauseOrResumeMusic(): void {
    if (this.isPlayingMusic) {
      this.audioService.pauseMusic();
      return;
    }

    if (this.audioService.hasCurrentTrack()) {
      this.audioService.resumeMusic();
    } else {
      this.audioService.playFromIndex(0);
    }
  }
  public nextMusic(): void {
    this.audioService.nextMusic();
  }
  public previousMusic(): void {
    this.audioService.previousMusic();
  }

  private syncWithCurrentlyPlayingTrack(): void {
    if (!this.audioService.isPlaying()) return;

    const currentName = this.audioService.getCurrentMusicName();
    const currentMusic = this.tw3Musics.find(
      (music) => music.musicName === currentName,
    );

    if (!currentMusic) return;

    this.selectedTrack.set(currentMusic);
    this.placeCardInTarget(currentMusic);
  }

  private placeCardInTarget(music: Musics): void {
    this.currentCardClone?.remove();

    const img = document.createElement('img');
    img.src = this.getCardFileName(music.musicName);
    img.alt = '';
    img.style.position = 'absolute';
    img.style.top = '0';
    img.style.left = '0';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.pointerEvents = 'none';

    this.cardTarget.nativeElement.appendChild(img);
    this.currentCardClone = img;
  }

  public onSelectTrack(
    music: Musics,
    index: number,
    cardEl: HTMLElement,
  ): void {
    if (this.isAnimating()) return;

    this.isAnimating.set(true);
    this.playClickSound();

    const startEl = cardEl.querySelector('.card-img') as HTMLElement;
    const targetEl = this.cardTarget.nativeElement;

    this.animateFlip(startEl, targetEl, (clone) => {
      clone.remove();
      this.isAnimating.set(false);
      this.audioService.playFromIndex(index);
      // selectedTrack + placeCardInTarget agora ficam a cargo do polling
    });
  }
  private animateFlip(
    originalEl: HTMLElement,
    targetEl: HTMLElement,
    onComplete: (clone: HTMLElement) => void,
  ): void {
    const startRect = originalEl.getBoundingClientRect();
    const endRect = targetEl.getBoundingClientRect();

    const clone = originalEl.cloneNode(true) as HTMLElement;
    clone.style.position = 'fixed';
    clone.style.top = `${startRect.top}px`;
    clone.style.left = `${startRect.left}px`;
    clone.style.width = `${startRect.width}px`;
    clone.style.height = `${startRect.height}px`;
    clone.style.margin = '0';
    clone.style.zIndex = '9999';
    clone.style.pointerEvents = 'none';
    clone.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    clone.style.willChange = 'transform';

    document.body.appendChild(clone);

    const deltaX =
      endRect.left + endRect.width / 2 - (startRect.left + startRect.width / 2);
    const deltaY =
      endRect.top + endRect.height / 2 - (startRect.top + startRect.height / 2);
    const scale = Math.min(
      endRect.width / startRect.width,
      endRect.height / startRect.height,
    );

    this.ngZone.runOutsideAngular(() => {
      requestAnimationFrame(() => {
        clone.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${scale})`;
      });

      clone.addEventListener(
        'transitionend',
        () => {
          this.ngZone.run(() => onComplete(clone));
        },
        { once: true },
      );
    });
  }

  public playMouseEnterOrLeaveSFX(): void {
    this.audioService.playSound('The Witcher 3-mouseEnterOrLeave');
  }
  public playClickSound(): void {
    this.audioService.playClickSound('The Witcher 3');
  }

  public getCardFileName(tw3MusicName: string): string {
    const cleanMusicName = tw3MusicName
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .trim()
      .replace(/\s+/g, '-');

    return `../../../../../../../../assets/themes/games/the witcher 3/cards/${cleanMusicName}-card.webp`;
  }
}
