import { Component, inject } from '@angular/core';

import { allPhotos, Photos } from '../../../models/photos';
import { DialogPhotoFullScreenComponent } from './dialog-photo-full-screen/dialog-photo-full-screen.component';
import { fadeInDownToUp_query } from '../../../shared/animations/fadeAndTranslate-animations';

import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';

import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-photos-footer',
  imports: [MatTooltipModule, TranslateModule],
  templateUrl: './photos-footer.component.html',
  styleUrl: './photos-footer.component.scss',
  animations: [fadeInDownToUp_query],
})
export class PhotosFooterComponent {
  allPhotos: Photos[] = allPhotos;
  private readonly dialog = inject(MatDialog);

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    clickedPhoto: Photos
  ): void {
    this.dialog.open(DialogPhotoFullScreenComponent, {
      width: '250px',
      maxHeight: '100vh',
      enterAnimationDuration,
      exitAnimationDuration,
      data: clickedPhoto,
    });
  }
}
