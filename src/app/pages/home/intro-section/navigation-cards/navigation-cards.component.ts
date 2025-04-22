import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { fadeInDownToUp_fadeOutUpToDown_enter } from '../../../../shared/animations/fadeAndTranslate-animations';

import { TranslateModule } from '@ngx-translate/core';
import { AudioService } from '../../../../services/audio-service/audio.service';
import { ThemeService } from '../../../../services/theme-service/theme.service';
import { Themes } from '../../../../models/themes';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-navigation-cards',
  imports: [RouterModule, MatCardModule, MatButtonModule, TranslateModule],
  templateUrl: './navigation-cards.component.html',
  styleUrl: './navigation-cards.component.scss',
  animations: [fadeInDownToUp_fadeOutUpToDown_enter],
})
export class NavigationCardsComponent implements OnInit, OnDestroy {
  @Input() showNavigationCards: boolean = false;
  private audioService: AudioService;
  private themeService: ThemeService;
  private themeSubscript!: Subscription;

  public actualTheme!: Themes;

  constructor() {
    this.themeService = inject(ThemeService);
    this.audioService = inject(AudioService);
  }

  ngOnInit(): void {
    this.themeSubscript = this.themeService.actualTheme$.subscribe((theme) => {
      this.actualTheme = theme;
    });
  }
  ngOnDestroy(): void {
    this.themeSubscript.unsubscribe();
  }

  public playClickSound(themeName: string) {
    this.audioService.playClickSound(themeName);
  }
}
