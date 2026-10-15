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

    const preloadPromises = this.undertaleMusicsMainMenu.map((mainMenuMusic) =>
      this.audioService.preloadSound(
        mainMenuMusic.musicName,
        mainMenuMusic.musicURL,
      ),
    );

    await Promise.all(preloadPromises);

    this.audioService.playSingleTrack(
      this.undertaleMusicsMainMenu[this.variationIndex],
      true,
    );
  }

  ngOnDestroy(): void {
    this.headerRestaurePosition();
    this.renderer.removeClass(this.document.body, 'home-page');

    this.unloadMusicsFromMenuType('mainMenu');
    this.unloadMusicsFromMenuType('configMenu');
    this.unloadMusicsFromMenuType('navigateMenu');
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

  public async changeMenuVariation(): Promise<void> {
    this.playClicksound();

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

  public openConfigMenu(): void {
    this.playClicksound();
    this.audioService.playSound('Undertale-enterConfig', 'sfx');
    this.unloadMusicsFromMenuType('mainMenu');

    this.currentMenuState.set('configMenu');
  }
}
