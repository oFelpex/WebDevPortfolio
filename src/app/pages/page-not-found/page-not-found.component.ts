import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AudioService } from '../../services/audio-service/audio.service';
import { ThemeService } from '../../services/theme-service/theme.service';
import { Themes } from '../../models/themes';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-page-not-found',
  imports: [RouterModule, TranslateModule, MatButtonModule],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss',
})
export class PageNotFoundComponent {
  private audioService: AudioService;
  private themeService: ThemeService;
  private themeSubscription!: Subscription;

  public actualTheme!: Themes;

  constructor() {
    this.themeService = inject(ThemeService);
    this.audioService = inject(AudioService);
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
