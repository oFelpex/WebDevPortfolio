import { Component, inject, OnDestroy, OnInit, output } from '@angular/core';
import { AudioService } from '../../../../../../services/audio-service/audio.service';
import { undertaleMusicsConfigMenuOnly } from '../../../../../../models/musics';
import { undertaleOpenFromCenter } from '../../../../../../shared/animations/games/undertale-animations';
import { CommonModule } from '@angular/common';
interface Leaf {
  id: number;
  sprite: number; // 1, 2 ou 3
  left: number; // Porcentagem da largura da tela (0 a 100)
  duration: number; // Tempo que demora para cair (segundos)
  delay: number; // Atraso para começar a cair
  size: number; // Tamanho em pixels
  rotationSpeed: number;
  drift: string; // Direção do vento ('left' ou 'right')
}
interface Particle {
  id: number;
  src: string;
  left: number;
  duration: number;
  delay: number;
  size: number;
  animClass: string;
}
@Component({
  selector: 'app-undertale-home-config',
  imports: [CommonModule],
  templateUrl: './undertale-home-config.component.html',
  styleUrl: './undertale-home-config.component.scss',
  animations: [undertaleOpenFromCenter],
})
export class UndertaleHomeConfigComponent implements OnInit, OnDestroy {
  private audioService: AudioService;
  private musics = undertaleMusicsConfigMenuOnly;
  private timeoutIdToPlayConfigMusics: number | undefined;
  // private currentSeason: number = this.getActualSeasonInBrazil();
  private currentSeason: number = 0;
  public particles: Particle[] = [];

  public leaves: Leaf[] = [];
  public exit = output<void>();

  constructor() {
    this.audioService = inject(AudioService);
  }

  async ngOnInit(): Promise<void> {
    this.audioService.playSound('Undertale-enterConfig', 'sfx');
    await Promise.all(
      this.musics.map((music) =>
        this.audioService.preloadSound(music.musicName, music.musicURL),
      ),
    );

    this.timeoutIdToPlayConfigMusics = setTimeout(() => {
      if (this.getActualSeasonInBrazil() === 3) {
        this.audioService.playSingleTrack(this.musics[2], true);
        // this.generateConfigFallenAnimations(100);
        this.setupSeasonParticles(100);

        console.log('season:' + this.getActualSeasonInBrazil());
        return;
      } else if (this.getActualSeasonInBrazil() === 2) {
        this.audioService.playSingleTrack(this.musics[1], true);
        // this.generateConfigFallenAnimations(100);
        this.setupSeasonParticles(100);

        console.log('season:' + this.getActualSeasonInBrazil());
        return;
      }
      this.audioService.playSingleTrack(
        this.musics[this.getActualSeasonInBrazil()],
        true,
      );
      // this.generateConfigFallenAnimations(100);
      this.setupSeasonParticles(100);

      console.log('season:' + this.getActualSeasonInBrazil());
    }, 1000);
  }

  ngOnDestroy(): void {
    this.musics.forEach((music) => this.audioService.unloadOneSound(music));
    clearTimeout(this.timeoutIdToPlayConfigMusics);
  }
  private getActualSeasonInBrazil(): number {
    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();

    let season = '';

    if (
      (month === 3 && day >= 20) ||
      month === 4 ||
      month === 5 ||
      (month === 6 && day <= 20)
    ) {
      season = 'fall';
    } else if (
      (month === 6 && day >= 21) ||
      month === 7 ||
      month === 8 ||
      (month === 9 && day <= 21)
    ) {
      season = 'winter';
    } else if (
      (month === 9 && day >= 22) ||
      month === 10 ||
      month === 11 ||
      (month === 12 && day <= 20)
    ) {
      season = 'spring';
    } else {
      season = 'summer';
    }

    switch (season) {
      case 'winter':
        return 0;
      case 'fall':
        return 1;
      case 'spring':
        return 2;
      case 'summer':
        return 3;
      default:
        return 1;
    }
  }

  public mouseEnterOrLeaveSFX(): void {
    this.audioService.playSound('Undertale-mouseEnterOrLeave');
  }

  public playClickSound(): void {
    this.audioService.playClickSound('Undertale');
  }

  public onExit(): void {
    this.playClickSound();
    this.exit.emit();
  }

  public generateConfigFallenAnimations(count: number): void {
    if (this.getActualSeasonInBrazil() !== 3) {
      for (let i = 0; i < count; i++) {
        this.leaves.push({
          id: i,
          sprite: i % 3,
          left: Math.random() * 100,
          duration: Math.random() * 2 + 3, // between 3s and 5s to fall
          delay: Math.random() * 3, //
          size: Math.random() * 8 + 16, // between 16px - 24px
          rotationSpeed: Math.random() * 3 + 2,
          drift: Math.random() > 0.5 ? 'drift-right' : 'drift-left',
        });
      }
    }
  }

  private setupSeasonParticles(count: number): void {
    const basePath =
      '../../../../../../../assets/themes/games/undertale/sprites/others/config-sprites/';

    for (let i = 0; i < count; i++) {
      let spriteSrc = '';
      let animClass = '';
      let duration = Math.random() * 5 + 4;
      let size = Math.random() * 12 + 16;

      switch (this.currentSeason) {
        case 0: // WINTER - 1 sprite
          spriteSrc = `${basePath}undertale-snow.webp`;
          animClass =
            Math.random() > 0.5 ? 'anim-fall-right' : 'anim-fall-left';
          duration = Math.random() * 6 + 6;
          size = Math.random() * 12 + 16;
          break;

        case 1: // FALL - 3 sprites
          const leafIndex = i % 3; // 0, 1 or 2
          spriteSrc = `${basePath}undertale-leaf-${leafIndex}.webp`;
          animClass =
            Math.random() > 0.5 ? 'anim-fall-right' : 'anim-fall-left';
          break;

        case 2: // SPRING - 1 sprite
          spriteSrc = `${basePath}undertale-spring-leaf.webp`;
          Math.random() > 0.5 ? 'anim-fall-right' : 'anim-fall-left';
          duration = Math.random() * 4 + 5;
          size = Math.random() * 12 + 16;
          break;

        case 3: // SUMMER - 1 sprite
          spriteSrc = `${basePath}undertale-sun.webp`;
          animClass = 'anim-sun';
          duration = Math.random() * 6 + 4;
          size = Math.random() * 6 + 8;
          break;
      }

      this.particles.push({
        id: i,
        src: spriteSrc,
        left: Math.random() * 100,
        duration: duration,
        delay: Math.random() * 3,
        size: size,
        animClass: animClass,
      });
    }
  }
}
