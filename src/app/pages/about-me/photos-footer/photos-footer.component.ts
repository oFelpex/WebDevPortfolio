import { Component, Input } from '@angular/core';

import { allPhotos, Photos } from '../../../models/photos';
import {
  animate,
  query,
  stagger,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-photos-footer',
  imports: [],
  templateUrl: './photos-footer.component.html',
  styleUrl: './photos-footer.component.scss',
  animations: [
    trigger('fadeInDownToUp', [
      transition(':enter', [
        query(
          '.photo-container',
          [
            style({ opacity: 0, transform: 'translateY(100px)' }),
            stagger(100, [
              animate(
                '200ms ease-out',
                style({ opacity: 1, transform: 'translateY(0)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class PhotosFooterComponent {
  allPhotos: Photos[] = allPhotos;
}
