import { Component, Inject, inject } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

import { Photos } from '../../../../models/photos';

import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'dialog-photo-full-screen',
  templateUrl: 'dialog-photo-full-screen.component.html',
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    TranslateModule,
  ],
})
export class DialogPhotoFullScreenComponent {
  private readonly dialogRef: MatDialogRef<DialogPhotoFullScreenComponent>;
  constructor(@Inject(MAT_DIALOG_DATA) public photo: Photos) {
    this.dialogRef = inject(MatDialogRef<DialogPhotoFullScreenComponent>);
  }
}
