import { DOCUMENT, NgComponentOutlet } from '@angular/common';
import {
  AfterViewInit,
  Component,
  inject,
  OnDestroy,
  OnInit,
  Renderer2,
  signal,
  Type,
} from '@angular/core';
import { undertaleHomeVariations } from './variations/undertale-home-variations';
import { AudioService } from '../../../../../services/audio-service/audio.service';
import { Musics, undertaleMusicsMenuOnly } from '../../../../../models/musics';
import { SFXs, undertaleSFX } from '../../../../../models/sfxs';

@Component({
  selector: 'app-undertale-home',
  imports: [NgComponentOutlet],
  templateUrl: './undertale-home.component.html',
  styleUrl: './undertale-home.component.scss',
})
export class UndertaleHomeComponent implements OnInit, OnDestroy {
  private renderer: Renderer2;
  private document: Document;
  private audioService: AudioService;

  private undertaleMusicsHome: Musics[] = undertaleMusicsMenuOnly;
  private undertaleSFXHome: SFXs[] = undertaleSFX;

  public variation = signal<Type<unknown> | null>(null);

  constructor() {
    this.renderer = inject(Renderer2);
    this.document = inject(DOCUMENT);

    this.audioService = inject(AudioService);
  }

  async ngOnInit(): Promise<void> {
    this.headerSetPosition();
    this.renderer.addClass(this.document.body, 'home-page');

    const index = Math.floor(Math.random() * undertaleHomeVariations.length);
    this.variation.set(await undertaleHomeVariations[index].component());

    this.undertaleSFXHome.map((HomeSFXs) => {
      this.audioService.preloadSound(HomeSFXs.SFXName, HomeSFXs.SFXURL);
    });

    const preloadPromises = this.undertaleMusicsHome.map((HomeMusic) =>
      this.audioService.preloadSound(HomeMusic.musicName, HomeMusic.musicURL),
    );

    await Promise.all(preloadPromises);

    this.audioService.playSingleTrack(this.undertaleMusicsHome[index], true);
  }

  ngOnDestroy(): void {
    this.headerRestaurePosition();
    this.renderer.removeClass(this.document.body, 'home-page');

    this.undertaleMusicsHome.map((HomeMusic) => {
      this.audioService.unloadOneSound(HomeMusic);
    });
  }

  public mouseEnterOrLeaveSFX(): void {
    this.audioService.playSound('Undertale-mouseEnterOrLeave');
  }
  public playClicksound(): void {
    this.audioService.playClickSound('Undertale');
  }

  private headerSetPosition() {
    const header = document.getElementById(
      'undertale-header',
    ) as HTMLHeadingElement;
    if (header) {
      header.style.display = 'none';
      header.style.visibility = 'hidden';
      header.style.height = '0px';
      header.style.minHeight = '0px';
    }
  }
  private headerRestaurePosition() {
    const header = document.getElementById(
      'undertale-header',
    ) as HTMLHeadingElement;
    if (header) {
      header.style.display = 'block';
      header.style.visibility = 'visible';
      header.style.height = '14vh';
      header.style.minHeight = '60px';
    }
  }
}
