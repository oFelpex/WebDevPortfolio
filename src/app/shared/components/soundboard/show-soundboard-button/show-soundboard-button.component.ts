import { Component, inject } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { SoundboardComponent } from './soundboard/soundboard.component';
import { getUp_return } from '../../../animations/translate-animations';
import { Themes } from '../../../../models/themes';
import { AudioService } from '../../../../services/audio-service/audio.service';
import { ThemeService } from '../../../../services/theme-service/theme.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-show-soundboard-button',
  imports: [MatButtonModule, MatIconModule, SoundboardComponent],
  templateUrl: './show-soundboard-button.component.html',
  styleUrl: './show-soundboard-button.component.scss',
  animations: [getUp_return],
})
export class ShowSoundboardButtonComponent {
  private audioService: AudioService;
  private themeService: ThemeService;
  private themeSubscription!: Subscription;

  public actualTheme!: Themes;
  public showSoundboard: boolean = false;

  constructor() {
    this.audioService = inject(AudioService);
    this.themeService = inject(ThemeService);
  }

  ngOnInit(): void {
    this.themeSubscription = this.themeService.actualTheme$.subscribe(
      (theme) => {
        this.actualTheme = theme;
      }
    );
  }
  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  public playClickSound(themeName: string) {
    this.audioService.playClickSound(themeName);
  }
}
