import { Component } from '@angular/core';
import { Musics, TW3Musics } from '../../../../../../../models/musics';
import { MatDialogActions, MatDialogContent } from '@angular/material/dialog';

@Component({
  selector: 'app-tw3-dialog-soundboard',
  imports: [MatDialogContent, MatDialogActions],
  templateUrl: './tw3-dialog-soundboard.component.html',
  styleUrl: './tw3-dialog-soundboard.component.scss',
})
export class Tw3DialogSoundboardComponent {
  public tw3Musics: Musics[] = TW3Musics;

  constructor() {}

  public getCardFileName(tw3MusicName: string): string {
    const cleanMusicName = tw3MusicName
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .trim()
      .replace(/\s+/g, '-');

    return `../../../../../../../../assets/themes/games/the witcher 3/cards/${cleanMusicName}-card.webp`;
  }
}
