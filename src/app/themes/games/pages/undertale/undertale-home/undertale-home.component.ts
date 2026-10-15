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
import {
  Musics,
  undertaleMusicsConfigMenuOnly,
  undertaleMusicsMenuOnly,
} from '../../../../../models/musics';
import { SFXs, undertaleSFX } from '../../../../../models/sfxs';
import { undertaleOpenFromCenter } from '../../../../../shared/animations/games/undertale-animations';

type undertaleMenus = 'mainMenu' | 'configMenu' | 'navigateMenu';
@Component({
  selector: 'app-undertale-home',
  imports: [NgComponentOutlet],
  templateUrl: './undertale-home.component.html',
  styleUrl: './undertale-home.component.scss',
  animations: [undertaleOpenFromCenter],
})
export class UndertaleHomeComponent implements OnInit, OnDestroy {
  private renderer: Renderer2;
  private document: Document;
  private audioService: AudioService;

  private undertaleMusicsMainMenu: Musics[] = undertaleMusicsMenuOnly;
  private undertaleMusicsConfigMenu: Musics[] = undertaleMusicsConfigMenuOnly;
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
      case 'configMenu':
        musics = this.undertaleMusicsConfigMenu;
        this.audioService.playSound('Undertale-enterConfig', 'sfx');

        await Promise.all(
          musics.map((music) =>
            this.audioService.preloadSound(music.musicName, music.musicURL),
          ),
        );

        setTimeout(() => {
          this.audioService.playSingleTrack(
            musics[this.getActualSeasonInBrazil()],
            true,
          );
        }, 1000);
        break;
    }
  }
  // NEEDS TO BE VISITED WHEN CREATING NAVIGATE MENU
  private unloadMusicsFromMenuType(menuType: undertaleMenus) {
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
      case 'configMenu':
        this.undertaleMusicsConfigMenu.map((configMenuMusic) => {
          this.audioService.unloadOneSound(configMenuMusic);
        });
        break;
    }
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
      case 'fall':
        return 1;
      case 'winter':
        return 0;
      case 'summer':
        return 2;
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

  public async unloadMusicsChangeMenuAndPreloadNewMusics(
    fromWhere: undertaleMenus,
    toWhere: undertaleMenus,
  ): Promise<void> {
    this.unloadMusicsFromMenuType(fromWhere);
    this.currentMenuState.set(toWhere);
    this.preloadMusicsAndPlay(toWhere);
  }
}
