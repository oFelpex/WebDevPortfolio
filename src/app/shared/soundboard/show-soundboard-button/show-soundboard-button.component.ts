import { Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { SoundboardComponent } from './soundboard/soundboard.component';

@Component({
  selector: 'app-show-soundboard-button',
  imports: [MatButtonModule, SoundboardComponent],
  templateUrl: './show-soundboard-button.component.html',
  styleUrl: './show-soundboard-button.component.scss',
})
export class ShowSoundboardButtonComponent {
  public showSoundboard: boolean = false;
}
