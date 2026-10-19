import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UndertaleThemesDialogComponent } from './themes/undertale-themes-dialog/undertale-themes-dialog.component';
import { UndertaleNavigationDialogComponent } from './navigation/undertale-navigation-dialog/undertale-navigation-dialog.component';

@Component({
  selector: 'app-undertale-dialogs',
  imports: [
    CommonModule,
    UndertaleThemesDialogComponent,
    UndertaleNavigationDialogComponent,
  ],
  templateUrl: './undertale-dialogs.component.html',
  styleUrl: './undertale-dialogs.component.scss',
})
export class UndertaleDialogsComponent {
  public dialogData;

  constructor() {
    this.dialogData = inject(MAT_DIALOG_DATA);
  }
}
