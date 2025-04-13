import { AfterViewChecked, Component, inject, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { MobileNavMenuService } from '../../../../services/mobile-menu-service/mobile-nav-menu.service';
import { MobileThemeMenuSheetComponent } from './mobile-theme-menu/mobile-theme-menu.component';
import { SocialLinksComponent } from '../../../components/social-links/social-links.component';
import { MobileLangsMenuSheetComponent } from './mobile-langs-menu/mobile-langs-menu.component';
import { AudioService } from '../../../../services/audio-service/audio.service';
import { ThemeService } from '../../../../services/theme-service/theme.service';
import { Themes } from '../../../../models/themes';

import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-mobile-menu',
  imports: [
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatDividerModule,
    RouterModule,
    SocialLinksComponent,
    TranslateModule,
  ],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.scss',
})
export class MobileMenuComponent implements AfterViewChecked {
  @ViewChild('mobileMenu') mobileMenu!: MatDrawer;

  private mobileNavMenuService: MobileNavMenuService;
  private audioService: AudioService;
  private themeService: ThemeService;
  private _bottomSheet: MatBottomSheet;

  constructor() {
    this.mobileNavMenuService = inject(MobileNavMenuService);
    this.audioService = inject(AudioService);
    this.themeService = inject(ThemeService);
    this._bottomSheet = inject(MatBottomSheet);
  }

  ngAfterViewChecked() {
    this.mobileNavMenuService.setDrawer(this.mobileMenu);

    this.mobileNavMenuService.changePointerEvents();
  }

  toggleFromComponent() {
    this.mobileNavMenuService.toggleMobileMenu();
  }

  openThemeMenu(): void {
    this._bottomSheet.open(MobileThemeMenuSheetComponent);
  }
  openLangsMenu(): void {
    this._bottomSheet.open(MobileLangsMenuSheetComponent);
  }

  public get getNameOfActualThemeFromLocalStorage(): Themes {
    return this.themeService.getNameOfActualTheme();
  }
  public playClickSound(themeName: string) {
    this.audioService.playClickSound(themeName);
  }
}
