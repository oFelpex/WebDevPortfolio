import { Component, OnInit } from '@angular/core';

import { NavigationCardsComponent } from './navigation-cards/navigation-cards.component';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import Typed from 'typed.js';

@Component({
  selector: 'app-intro-section',
  imports: [MatButtonModule, MatIconModule, NavigationCardsComponent],
  templateUrl: './intro-section.component.html',
  styleUrl: './intro-section.component.scss',
})
export class IntroSectionComponent implements OnInit {
  ngOnInit(): void {
    new Typed('.auto-type', {
      strings: [
        'Front-end Developer^2500',
        'Web Developer^2500',
        'student^4000',
      ],
      typeSpeed: 100,
      backSpeed: 30,
      loop: true,
    });
  }

  showNavigationCards: boolean = false;
  toggleNavigationCards() {
    this.showNavigationCards = !this.showNavigationCards;
    let introSectionButtonIcon = document.querySelector(
      '.intro-section-button-icon'
    ) as HTMLElement;
    introSectionButtonIcon.style.transition = '0.3s';
    this.showNavigationCards
      ? (introSectionButtonIcon.style.transform = 'rotate(180deg)')
      : (introSectionButtonIcon.style.transform = 'rotate(0deg)');
  }
}
