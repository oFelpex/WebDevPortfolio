import { Component, inject } from '@angular/core';

import { allPhotos, Photos } from '../../../models/photos';
import { DialogPhotoFullScreenComponent } from './dialog-photo-full-screen/dialog-photo-full-screen.component';

import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-photos-footer',
  imports: [MatTooltipModule],
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

  readonly dialog = inject(MatDialog);
  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    clickedPhoto: Photos
  ): void {
    this.dialog.open(DialogPhotoFullScreenComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: clickedPhoto,
    });
  }
}
