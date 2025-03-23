import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { fadeInDownToUp_fadeOutUpToDown } from '../../../../shared/animations/fade-animations';
@Component({
  selector: 'app-navigation-cards',
  imports: [RouterModule, MatCardModule, MatButtonModule],
  templateUrl: './navigation-cards.component.html',
  styleUrl: './navigation-cards.component.scss',
  animations: [fadeInDownToUp_fadeOutUpToDown],
})
export class NavigationCardsComponent {
  @Input() showNavigationCards: boolean = false;
}
