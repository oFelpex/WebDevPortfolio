import { Component, inject, OnInit, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AudioService } from '../../../../../../services/audio-service/audio.service';
import { Tw3NavigateMapComponent } from './navigate/tw3-navigate-map/tw3-navigate-map.component';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
} from '@angular/material/dialog';
import { Tw3DialogNavigateComponent } from './navigate/tw3-dialog-navigate.component';
import { Tw3DialogSoundboardComponent } from './soundboard/tw3-dialog-soundboard.component';
import { Tw3DialogOptionsComponent } from './options/tw3-dialog-options.component';
type HomeOptionsMenuState =
  | 'options'
  | 'themes'
  | 'langs'
  | 'gameThemes'
  | 'colorThemes';
@Component({
  selector: 'app-tw3-home-dialogs',
  imports: [
    TranslateModule,
    Tw3DialogNavigateComponent,
    Tw3DialogOptionsComponent,
    Tw3DialogSoundboardComponent,
    MatDialogActions,
  ],
  templateUrl: './tw3-home-dialogs.component.html',
  styleUrl: './tw3-home-dialogs.component.scss',
})
export class Tw3HomeDialogsComponent implements OnInit {
  private audioService: AudioService;
  private matDialogData;

  public currentOptionsMenu = signal<HomeOptionsMenuState>('options');
  public dialogType!: string;
  public dialog: MatDialog;

  constructor() {
    this.audioService = inject(AudioService);

    this.dialog = inject(MatDialog);
    this.matDialogData = inject(MAT_DIALOG_DATA);
  }

  ngOnInit() {
    this.dialogType = this.matDialogData.dialogType;
  }

  public playClickSound() {
    this.audioService.playClickSound('The Witcher 3');
  }
  public openTypeOfOptionsMenu(optionsMenuType: HomeOptionsMenuState): void {
    this.playClickSound();
    this.currentOptionsMenu.set(optionsMenuType);
  }
  public closeAllDialogs(): void {
    this.playClickSound();
    this.dialog.closeAll();
  }
}
