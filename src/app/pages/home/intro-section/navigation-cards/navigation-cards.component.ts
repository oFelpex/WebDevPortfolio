import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-navigation-cards',
  imports: [RouterModule, MatCardModule, MatButtonModule],
  templateUrl: './navigation-cards.component.html',
  styleUrl: './navigation-cards.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(100px)' }),
        animate(
          '300ms ease-in-out',
          style({ opacity: 1, transform: 'translateY(0px)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '300ms ease-in-out',
          style({ opacity: 0, transform: 'translateY(100px)' })
        ),
      ]),
    ]),
  ],
})
export class NavigationCardsComponent {
  @Input() showNavigationCards: boolean = false;
}
