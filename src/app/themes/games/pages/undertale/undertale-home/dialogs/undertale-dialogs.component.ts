import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UndertaleThemesDialogComponent } from './themes/undertale-themes-dialog/undertale-themes-dialog.component';

@Component({
  selector: 'app-undertale-dialogs',
  imports: [CommonModule, UndertaleThemesDialogComponent],
  templateUrl: './undertale-dialogs.component.html',
  styleUrl: './undertale-dialogs.component.scss',
})
export class UndertaleDialogsComponent {
  public dialogData;

  constructor() {
    this.dialogData = inject(MAT_DIALOG_DATA);
  }
}
