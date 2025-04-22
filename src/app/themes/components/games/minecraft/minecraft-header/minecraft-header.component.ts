import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';

import { LogoEffectsComponent } from '../../../../../logo-effects/logo-effects.component';
import { AudioService } from '../../../../../services/audio-service/audio.service';
import { ThemeService } from '../../../../../services/theme-service/theme.service';
import { Themes } from '../../../../../models/themes';

@Component({
  selector: 'app-minecraft-header',
  imports: [
    LogoEffectsComponent,
    MatButtonModule,
    MatMenuModule,
    MatBadgeModule,
    TranslateModule,
    RouterModule,
  ],
  templateUrl: './minecraft-header.component.html',
  styleUrl: './minecraft-header.component.scss',
})
export class MinecraftHeaderComponent implements OnInit {
  public currentRoute!: string;
  public phrase!: string;
  public allRoutes: string[] = [
    '/home',
    '/projects',
    '/about-me',
    '/contact-me',
  ];
  public allLangs!: string[];

  // JUST A REMAINDER: CHANGE TO SOME SIMPLE PHRASES SO I CAN USE THE TRANSLATESERVICE
  private listOfPhrases: string[] = [
    'Indie games are the best!',
    'Trying to be better...',
    'Corn cake is the best!',
    'Also try Terraria!',
    'Also try Undertale!',
    'Dark Souls II is good',
    'Never stop studying!',
    'An elegant phrase!',
    `There's more than one sentence here.`,
    'Be kind',
    'Never forget your friends',
  ];
  private themeService: ThemeService;
  private audioService: AudioService;
  private translateService: TranslateService;
  private router: Router;

  constructor() {
    this.audioService = inject(AudioService);
    this.themeService = inject(ThemeService);
    this.translateService = inject(TranslateService);
    this.router = inject(Router);
  }

  ngOnInit(): void {
    this.phrase = this.listOfPhrases[this.phraseNumber()];
    this.allLangs = this.translateService.langs;

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = this.router.url;
      }
    });
  }

  private phraseNumber(): number {
    return Math.round(Math.random() * (this.listOfPhrases.length - 1) + 1);
  }

  public get actualTheme(): Themes {
    return this.themeService.getNameOfActualTheme();
  }
  public get allGamesThemes(): Themes[] {
    return this.themeService.getGamesNames();
  }
  public get allColorThemes(): Themes[] {
    return this.themeService.getColorsNames();
  }
  public changeTheme(theme: Themes): void {
    this.themeService.changeTheme(theme);
  }

  public changeLang(lang: string): void {
    this.translateService.use(lang);
  }
  public get actualLang(): string {
    return this.translateService.currentLang;
  }

  public playClickSound(): void {
    this.audioService.playClickSound('Minecraft');
  }
}
