import { Component, inject, OnDestroy, OnInit } from '@angular/core';

import { NavigationCardsComponent } from './navigation-cards/navigation-cards.component';
import { getDownToUp_getUptoDown } from '../../../shared/animations/translate-animations';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import Typed from 'typed.js';
import {
  LangChangeEvent,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { Subscription } from 'rxjs';

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
  animations: [getDownToUp_getUptoDown],
})
export class IntroSectionComponent implements OnInit, OnDestroy {
  translate: TranslateService;
  private langSubscription!: Subscription;

  constructor() {
    this.translate = inject(TranslateService);
  }

  ngOnInit(): void {
    let typedInstance: Typed;
    let EN_autoTypeArr: string[] = [
      'Front end developer^2500',
      'Web developer^2500',
      'student^4000',
    ];
    let ptBR_autoTypeArr: string[] = [
      'Desenvolvedor front end^2500',
      'Desenvolvedor web^2500',
      'Estudante^4000',
    ];
    let autoTypeArr: string[] = [];

    this.translate.currentLang === 'en'
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
        event.lang === 'en'
          ? (autoTypeArr = EN_autoTypeArr)
          : (autoTypeArr = ptBR_autoTypeArr);
        typedInstance.destroy();

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
    let introSectionButtonIcon = document.querySelector(
      '.intro-section-button-icon'
    ) as HTMLElement;
    introSectionButtonIcon.style.transition = '0.3s';
    this.showNavigationCards
      ? (introSectionButtonIcon.style.transform = 'rotate(180deg)')
      : (introSectionButtonIcon.style.transform = 'rotate(0deg)');
  }

  ngOnDestroy(): void {
    this.langSubscription.unsubscribe();
  }
}
