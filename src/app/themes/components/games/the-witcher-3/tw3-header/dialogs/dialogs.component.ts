import { Component, inject } from '@angular/core';

import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogTitle,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';

import { ThemeService } from '../../../../../../services/theme-service/theme.service';
import { Tw3DialogGamesComponent } from './themes/tw3-dialog-games/tw3-dialog-games.component';
import { Tw3DialogColorsComponent } from './themes/tw3-dialog-colors/tw3-dialog-colors.component';
import { Tw3DialogLangsComponent } from './langs/tw3-dialog-langs/tw3-dialog-langs.component';
import { AudioService } from '../../../../../../services/audio-service/audio.service';

@Component({
  selector: 'app-dialogs',
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatButtonModule,
    MatExpansionModule,
    Tw3DialogGamesComponent,
    Tw3DialogColorsComponent,
    Tw3DialogLangsComponent,
  ],
  templateUrl: './dialogs.component.html',
  styleUrl: './dialogs.component.scss',
})
export class DialogsComponent {
  private themeService: ThemeService;
  private audioService: AudioService;

  public data = inject(MAT_DIALOG_DATA);

  constructor() {
    this.audioService = inject(AudioService);
    this.themeService = inject(ThemeService);
  }

  public get actualTheme() {
    return this.themeService.getNameOfActualTheme().name;
  }
  public get typeOfActualTheme() {
    return this.themeService.getTypeOfActualTheme();
  }

  public playClickSound() {
    this.audioService.playClickSound('The Witcher 3');
  }
}
