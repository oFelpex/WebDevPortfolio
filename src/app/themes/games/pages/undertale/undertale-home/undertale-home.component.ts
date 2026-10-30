import { DOCUMENT, NgComponentOutlet } from '@angular/common';
import {
  Component,
  DestroyRef,
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
import { UndertaleHomeSoundboardComponent } from './undertale-home-soundboard/undertale-home-soundboard.component';
import { UndertaleHomeNavigationComponent } from './undertale-home-navigation/undertale-home-navigation.component';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

type undertaleMenus =
  | 'mainMenu'
  | 'configMenu'
  | 'navigationMenu'
  | 'soundboard';
@Component({
  selector: 'app-undertale-home',
  imports: [
    NgComponentOutlet,
    UndertaleHomeConfigComponent,
    UndertaleHomeSoundboardComponent,
    UndertaleHomeNavigationComponent,
  ],
  templateUrl: './undertale-home.component.html',
  styleUrl: './undertale-home.component.scss',
})
export class UndertaleHomeComponent implements OnInit, OnDestroy {
  private renderer: Renderer2;
  private document: Document;
  private audioService: AudioService;

  private undertaleMusicsMainMenu: Musics[] = undertaleMusicsMenuOnly;
  private undertaleSFXHome: SFXs[] = undertaleSFX;

  private isFirstMenu = true;
  private isDestroyed = false;
  private router: Router;
  private route: ActivatedRoute;
  private destroyRef: DestroyRef;
  private readonly openableMenus: undertaleMenus[] = [
    'soundboard',
    'configMenu',
    'navigationMenu',
  ];

  private variationIndex: number = Math.floor(
    Math.random() * undertaleHomeVariations.length,
  );
  public variation = signal<Type<unknown> | null>(null);

  public currentMenuState = signal<undertaleMenus>('mainMenu');

  constructor() {
    this.renderer = inject(Renderer2);
    this.document = inject(DOCUMENT);
    this.router = inject(Router);
    this.destroyRef = inject(DestroyRef);
    this.route = inject(ActivatedRoute);

    this.audioService = inject(AudioService);
  }

  async ngOnInit(): Promise<void> {
    this.route.queryParamMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) =>
        this.handleMenuChange(this.menuFromParam(params.get('menu'))),
      );

    this.headerSetPosition();
    this.renderer.addClass(this.document.body, 'home-page');

    this.undertaleSFXHome.forEach((HomeSFXs) => {
      this.audioService.preloadSound(HomeSFXs.SFXName, HomeSFXs.SFXURL);
    });

    this.variation.set(
      await undertaleHomeVariations[this.variationIndex].component(),
    );
  }

  ngOnDestroy(): void {
    this.isDestroyed = true;
    this.headerRestaurePosition();
    this.renderer.removeClass(this.document.body, 'home-page');

    this.unloadMainMenuMusics();
  }

  public goToMenu(menu: undertaleMenus): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { menu: menu === 'mainMenu' ? null : menu },
    });
  }

  private menuFromParam(value: string | null): undertaleMenus {
    return this.openableMenus.includes(value as undertaleMenus)
      ? (value as undertaleMenus)
      : 'mainMenu';
  }

  private async handleMenuChange(menu: undertaleMenus): Promise<void> {
    const previous = this.currentMenuState();

    if (!this.isFirstMenu) {
      if (menu === previous) return;
      if (previous === 'mainMenu') this.unloadMainMenuMusics();
    }
    const wasFirst = this.isFirstMenu;
    this.isFirstMenu = false;

    this.currentMenuState.set(menu);

    if (menu === 'mainMenu') {
      if (!wasFirst) await this.nextMacrotask();
      if (this.isDestroyed) return;
      this.playMainMenuMusic();
    }
  }

  private nextMacrotask(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve));
  }

  private async playMainMenuMusic(): Promise<void> {
    await Promise.all(
      this.undertaleMusicsMainMenu.map((music) =>
        this.audioService.preloadSound(music.musicName, music.musicURL),
      ),
    );

    if (this.isDestroyed) {
      this.unloadMainMenuMusics();
      return;
    }
    if (this.currentMenuState() !== 'mainMenu') return;

    const trackToPlay = this.undertaleMusicsMainMenu[this.variationIndex];
    if (trackToPlay) this.audioService.playSingleTrack(trackToPlay, true);
  }

  private unloadMainMenuMusics(): void {
    this.undertaleMusicsMainMenu.forEach((music) =>
      this.audioService.unloadOneSound(music),
    );
  }

  public async changeMenuVariation(): Promise<void> {
    this.variationIndex =
      (this.variationIndex + 1) % undertaleHomeVariations.length;

    this.variation.set(
      await undertaleHomeVariations[this.variationIndex].component(),
    );
    this.audioService.playSingleTrack(
      this.undertaleMusicsMainMenu[this.variationIndex],
      true,
    );
  }

  public mouseEnterOrLeaveSFX(): void {
    this.audioService.playSound('Undertale-mouseEnterOrLeave');
  }
  public playClickSound(): void {
    this.audioService.playClickSound('Undertale');
  }

  private headerSetPosition(): void {
    const header = this.document.getElementById('undertale-header');
    if (header) {
      header.style.display = 'none';
      header.style.visibility = 'hidden';
      header.style.height = '0px';
    }
  }
  private headerRestaurePosition(): void {
    const header = this.document.getElementById('undertale-header');
    if (header) {
      header.style.display = 'block';
      header.style.visibility = 'visible';
      header.style.height = '8vh';
    }
  }
}
