import { DOCUMENT, NgComponentOutlet } from '@angular/common';
import {
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
import { UndertaleHomeConfigComponent } from './undertale-home-config/undertale-home-config.component';

type undertaleMenus = 'mainMenu' | 'configMenu' | 'navigateMenu';
@Component({
  selector: 'app-undertale-home',
  imports: [NgComponentOutlet, UndertaleHomeConfigComponent],
  templateUrl: './undertale-home.component.html',
  styleUrl: './undertale-home.component.scss',
})
export class UndertaleHomeComponent implements OnInit, OnDestroy {
  private renderer: Renderer2;
  private document: Document;
  private audioService: AudioService;

  private undertaleMusicsMainMenu: Musics[] = undertaleMusicsMenuOnly;
  private undertaleSFXHome: SFXs[] = undertaleSFX;

  private variationIndex: number = Math.floor(
    Math.random() * undertaleHomeVariations.length,
  );
  public variation = signal<Type<unknown> | null>(null);

  public currentMenuState = signal<undertaleMenus>('mainMenu');

  constructor() {
    this.renderer = inject(Renderer2);
    this.document = inject(DOCUMENT);

    this.audioService = inject(AudioService);
  }

  async ngOnInit(): Promise<void> {
    this.headerSetPosition();
    this.renderer.addClass(this.document.body, 'home-page');

    this.undertaleSFXHome.map((HomeSFXs) => {
      this.audioService.preloadSound(HomeSFXs.SFXName, HomeSFXs.SFXURL);
    });

    this.variation.set(
      await undertaleHomeVariations[this.variationIndex].component(),
    );

    this.preloadMusicsAndPlay('mainMenu');
  }

  ngOnDestroy(): void {
    this.headerRestaurePosition();
    this.renderer.removeClass(this.document.body, 'home-page');

    this.unloadMusicsFromMenuType('mainMenu');
    this.unloadMusicsFromMenuType('configMenu');
    this.unloadMusicsFromMenuType('navigateMenu');
  }
  private headerSetPosition(): void {
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
  private headerRestaurePosition(): void {
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

  public mouseEnterOrLeaveSFX(): void {
    this.audioService.playSound('Undertale-mouseEnterOrLeave');
  }
  public playClickSound(): void {
    this.audioService.playClickSound('Undertale');
  }

  // NEEDS TO BE VISITED WHEN CREATING NAVIGATE MENU
  private async preloadMusicsAndPlay(menu: undertaleMenus): Promise<void> {
    let musics: Musics[] = [];

    switch (menu) {
      case 'mainMenu':
        musics = this.undertaleMusicsMainMenu;
        await Promise.all(
          musics.map((music) =>
            this.audioService.preloadSound(music.musicName, music.musicURL),
          ),
        );

        const trackToPlay = musics[this.variationIndex];

        if (trackToPlay) {
          this.audioService.playSingleTrack(trackToPlay, true);
        }
        break;
      case 'navigateMenu':
        // musics = this.undertaleMusicsNavigateMenu;
        break;
    }
  }
  // NEEDS TO BE VISITED WHEN CREATING NAVIGATE MENU
  private unloadMusicsFromMenuType(menuType: undertaleMenus): void {
    switch (menuType) {
      case 'mainMenu':
        this.undertaleMusicsMainMenu.map((mainMenuMusic) => {
          this.audioService.unloadOneSound(mainMenuMusic);
        });
        break;
      case 'navigateMenu':
        // this.undertaleMusicsNavigateMenu.map((navigateMenuMusic) => {
        //   this.audioService.unloadOneSound(navigateMenuMusic);
        // });

        break;
    }
  }

  public async unloadMusicsChangeMenuAndPreloadNewMusics(
    fromWhere: undertaleMenus,
    toWhere: undertaleMenus,
  ): Promise<void> {
    this.unloadMusicsFromMenuType(fromWhere);
    this.currentMenuState.set(toWhere);
    this.preloadMusicsAndPlay(toWhere);
  }

  public async changeMenuVariation(): Promise<void> {
    if (this.variationIndex < undertaleHomeVariations.length - 1) {
      this.variationIndex++;
    } else {
      this.variationIndex = 0;
    }

    this.variation.set(
      await undertaleHomeVariations[this.variationIndex].component(),
    );
    this.audioService.playSingleTrack(
      this.undertaleMusicsMainMenu[this.variationIndex],
      true,
    );
  }
}
