import { Component, inject } from '@angular/core';
import { Musics, TW3Musics } from '../../../../../../../models/musics';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
} from '@angular/material/dialog';
import { AudioService } from '../../../../../../../services/audio-service/audio.service';

@Component({
  selector: 'app-tw3-dialog-soundboard',
  imports: [MatDialogContent, MatDialogActions, MatDialogClose],
  templateUrl: './tw3-dialog-soundboard.component.html',
  styleUrl: './tw3-dialog-soundboard.component.scss',
})
export class Tw3DialogSoundboardComponent {
  public tw3Musics: Musics[] = TW3Musics;

  private audioService: AudioService;

  constructor() {
    this.audioService = inject(AudioService);
  }

  public playMouseEnterOrLeaveSFX(): void {
    // Remamber to change the sound effect to a more appropriate one for mouse enter/leave events
    this.audioService.playSound('The Witcher 3-mouseEnterOrLeave');
  }
  public playClickSound(): void {
    this.audioService.playClickSound('The Witcher 3');
  }

  public getCardFileName(tw3MusicName: string): string {
    const cleanMusicName = tw3MusicName
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .trim()
      .replace(/\s+/g, '-');

    return `../../../../../../../../assets/themes/games/the witcher 3/cards/${cleanMusicName}-card.webp`;
  }
}
