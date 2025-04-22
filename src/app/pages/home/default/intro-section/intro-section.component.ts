import { Component, inject, OnDestroy, OnInit } from '@angular/core';

import { NavigationCardsComponent } from './navigation-cards/navigation-cards.component';
import { getDownToUp_getUptoDown_introSection } from '../../../../shared/animations/translate-animations';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import Typed from 'typed.js';
import {
  LangChangeEvent,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Themes } from '../../../../models/themes';
import { ThemeService } from '../../../../services/theme-service/theme.service';
import { AudioService } from '../../../../services/audio-service/audio.service';

@Component({
  selector: 'app-intro-section',
  imports: [
    MatButtonModule,
    MatIconModule,
    NavigationCardsComponent,
    TranslateModule,
  ],
  templateUrl: './intro-section.component.html',
  styleUrl: './intro-section.component.scss',
  animations: [getDownToUp_getUptoDown_introSection],
})
export class IntroSectionComponent implements OnInit, OnDestroy {
  private translate: TranslateService;
  private langSubscription!: Subscription;
  private audioService: AudioService;
  private themeService: ThemeService;
  private themeSubscription!: Subscription;

  public actualTheme!: Themes;

  constructor() {
    this.translate = inject(TranslateService);
    this.themeService = inject(ThemeService);
    this.audioService = inject(AudioService);
  }

  ngOnInit(): void {
    this.themeSubscription = this.themeService.actualTheme$.subscribe(
      (theme) => {
        this.actualTheme = theme;
      }
    );

    let typedInstance: Typed;
    let EN_autoTypeArr: string[] = [
      'front end developer^2500',
      'web developer^2500',
      'student^4000',
    ];
    let ptBR_autoTypeArr: string[] = [
      'desenvolvedor front end^2500',
      'desenvolvedor web^2500',
      'estudante^4000',
    ];
    let autoTypeArr: string[] = [];

    this.translate.currentLang === 'en-US'
      ? (autoTypeArr = EN_autoTypeArr)
      : (autoTypeArr = ptBR_autoTypeArr);

    typedInstance = new Typed('.auto-type', {
      strings: [...autoTypeArr],
      typeSpeed: 100,
      backSpeed: 30,
      loop: true,
    });

    this.langSubscription = this.translate.onLangChange.subscribe(
      (event: LangChangeEvent) => {
        typedInstance.destroy();

        event.lang === 'en-US'
          ? (autoTypeArr = EN_autoTypeArr)
          : (autoTypeArr = ptBR_autoTypeArr);

        typedInstance = new Typed('.auto-type', {
          strings: [...autoTypeArr],
          typeSpeed: 100,
          backSpeed: 30,
          loop: true,
        });
      }
    );
  }

  showNavigationCards: boolean = false;
  toggleNavigationCards() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    this.showNavigationCards = !this.showNavigationCards;
  }

  public playClickSound(themeName: string) {
    this.audioService.playClickSound(themeName);
  }

  ngOnDestroy(): void {
    this.langSubscription.unsubscribe();
    this.themeSubscription.unsubscribe();
  }
}
