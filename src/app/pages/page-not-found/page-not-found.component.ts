import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AudioService } from '../../services/audio-service/audio.service';
import { ThemeService } from '../../services/theme-service/theme.service';
import { Themes } from '../../models/themes';

@Component({
  selector: 'app-page-not-found',
  imports: [RouterModule, TranslateModule, MatButtonModule],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss',
})
export class PageNotFoundComponent {
  private audioService: AudioService;
  private themeService: ThemeService;

  constructor() {
    this.themeService = inject(ThemeService);
    this.audioService = inject(AudioService);
  }

  public get getNameOfActualThemeFromLocalStorage(): Themes {
    return this.themeService.getNameOfActualTheme();
  }
  public playClickSound(themeName: string) {
    this.audioService.playClickSound(themeName);
  }
}
