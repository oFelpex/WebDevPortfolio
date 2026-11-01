import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

import { AudioService } from '../../../../services/audio-service/audio.service';
import { SFXs, undertaleFinaleSFX } from '../../../../models/sfxs';

interface Soul {
  name: string;
  angle: number;
}

interface Attack {
  id: number;
  soulName: string;
  spinDelay: string;
}

@Component({
  selector: 'app-undertale',
  imports: [],
  templateUrl: './undertale-effect.component.html',
  styleUrl: './undertale-effect.component.scss',
})
export class UndertaleEffectComponent implements OnInit, OnDestroy {
  private audioService: AudioService;
  private undertaleFinaleSFX: SFXs[] = undertaleFinaleSFX;

  // 'Undertale-finale-effect' (21.5s)
  private readonly animationDuration = 21500;
  private readonly attackDuration = 1000;
  private readonly attackInterval = 4000;
  private readonly attackStartDelay = 1200;
  // $orbit-speed
  private readonly orbitSpeed = 3500;

  private timeOuts: ReturnType<typeof setTimeout>[] = [];
  private intervals: ReturnType<typeof setInterval>[] = [];
  private healFlashTimeOut?: ReturnType<typeof setTimeout>;
  private nextAttackId = 0;
  private finaleStartTime = 0;
  private finaleSound: AudioBufferSourceNode | null = null;

  public readonly spritesPath =
    '../../../../../assets/themes/games/undertale/sprites/others/effect/';

  public readonly souls: Soul[] = [
    'dark-blue',
    'green',
    'light-blue',
    'orange',
    'purple',
    'yellow',
  ].map((name, index, list) => ({ name, angle: (360 / list.length) * index }));

  public isPlaying = signal(false);
  public attacks = signal<Attack[]>([]);
  public isHealing = signal(false);

  constructor() {
    this.audioService = inject(AudioService);

    inject(Router)
      .events.pipe(
        filter((event) => event instanceof NavigationStart),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.endFinale());
  }

  ngOnInit(): void {
    this.preloadSFX();
  }

  ngOnDestroy(): void {
    this.endFinale();
  }

  public async finale(): Promise<void> {
    if (this.isPlaying()) return;

    this.isPlaying.set(true);
    this.finaleStartTime = performance.now();
    await this.preloadSFX();

    if (!this.isPlaying()) return;
    this.finaleSound = this.audioService.playSound(
      'Undertale-finale-effect',
      'sfx',
    );

    const lastAttackTime = this.animationDuration - this.attackDuration * 2;

    this.timeOuts.push(
      setTimeout(() => {
        this.fireAttacks();
        this.intervals.push(
          setInterval(() => this.fireAttacks(), this.attackInterval),
        );
      }, this.attackStartDelay),
      setTimeout(() => this.intervals.forEach(clearInterval), lastAttackTime),
      setTimeout(() => this.endFinale(), this.animationDuration),
    );
  }

  public onAttackHit(event: AnimationEvent, attack: Attack): void {
    if (event.target !== event.currentTarget) return;

    this.attacks.update((attacks) =>
      attacks.filter(({ id }) => id !== attack.id),
    );
    if (!this.isHealing()) {
      this.audioService.playSound('Undertale-heal-effect', 'sfx');
    }

    this.isHealing.set(true);
    clearTimeout(this.healFlashTimeOut);
    this.healFlashTimeOut = setTimeout(() => this.isHealing.set(false), 200);
  }

  public attacksOf(soul: Soul): Attack[] {
    return this.attacks().filter(({ soulName }) => soulName === soul.name);
  }

  private fireAttacks(): void {
    const orbitPhase =
      (performance.now() - this.finaleStartTime) % this.orbitSpeed;

    this.attacks.update((attacks) => [
      ...attacks,
      ...this.souls.map((soul) => ({
        id: this.nextAttackId++,
        soulName: soul.name,
        spinDelay: -orbitPhase + 'ms',
      })),
    ]);
  }

  private endFinale(): void {
    this.clearTimers();
    clearTimeout(this.healFlashTimeOut);

    this.finaleSound?.stop();
    this.finaleSound = null;

    this.attacks.set([]);
    this.isHealing.set(false);
    this.isPlaying.set(false);
  }

  private clearTimers(): void {
    this.timeOuts.forEach(clearTimeout);
    this.intervals.forEach(clearInterval);
    this.timeOuts = [];
    this.intervals = [];
  }

  private async preloadSFX(): Promise<void> {
    await Promise.all(
      this.undertaleFinaleSFX.map((SFX) =>
        this.audioService.preloadSound(SFX.SFXName, SFX.SFXURL),
      ),
    );
  }
}
