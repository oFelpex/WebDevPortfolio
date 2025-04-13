import { AfterViewChecked, Component, inject, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';

import { AudioService } from '../../../../services/audio-service/audio.service';
import { ThemeService } from '../../../../services/theme-service/theme.service';
import { MobileSoundboardMenuService } from '../../../../services/mobile-soundboard-menu/mobile-soundboard-menu.service';
import { Themes } from '../../../../models/themes';

@Component({
  selector: 'app-mobile-soundboard',
  imports: [MatSidenavModule, MatButtonModule, TranslateModule],
  templateUrl: './mobile-soundboard.component.html',
  styleUrl: './mobile-soundboard.component.scss',
})
export class MobileSoundboardComponent implements AfterViewChecked {
  @ViewChild('mobileSoundboard') mobileSoundboard!: MatDrawer;

  private mobileSoundboardMenuService: MobileSoundboardMenuService;
  private audioService: AudioService;
  private themeService: ThemeService;

  constructor() {
    this.mobileSoundboardMenuService = inject(MobileSoundboardMenuService);
    this.audioService = inject(AudioService);
    this.themeService = inject(ThemeService);
  }

  ngAfterViewChecked() {
    this.mobileSoundboardMenuService.setMobileSoundboardDrawer(
      this.mobileSoundboard
    );

    this.mobileSoundboardMenuService.changeMobileSoundboardPointerEvents();
  }

  public get getNameOfActualThemeFromLocalStorage(): Themes {
    return this.themeService.getNameOfActualTheme();
  }
  public playClickSound(themeName: string) {
    this.audioService.playClickSound(themeName);
  }
}
