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
    // trigger('expandCollapse', [
    //   state(
    //     'expanded',
    //     style({
    //       'min-height': '0px',
    //     })
    //   ),
    //   state(
    //     'collapsed',
    //     style({
    //       'min-height': '400px',
    //     })
    //   ),
    //   transition('collapsed <=> expanded', animate('400ms ease-in-out')),
    // ]),
  ],
})
export class NavigationCardsComponent {
  @Input() showNavigationCards: boolean = false;
}
