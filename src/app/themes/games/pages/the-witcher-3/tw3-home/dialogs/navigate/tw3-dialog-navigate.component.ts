import { Component, inject } from '@angular/core';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { AudioService } from '../../../../../../../services/audio-service/audio.service';
import { Tw3NavigateMapComponent } from './tw3-navigate-map/tw3-navigate-map.component';

@Component({
  selector: 'app-tw3-dialog-navigate',
  imports: [
    TranslateModule,
    MatDialogClose,
    MatDialogContent,
    Tw3NavigateMapComponent,
  ],
  templateUrl: './tw3-dialog-navigate.component.html',
  styleUrl: './tw3-dialog-navigate.component.scss',
})
export class Tw3DialogNavigateComponent {
  private audioService: AudioService;

  constructor() {
    this.audioService = inject(AudioService);
  }
  public playClickSound() {
    this.audioService.playClickSound('The Witcher 3');
  }
}
