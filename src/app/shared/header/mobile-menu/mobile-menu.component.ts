import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RouterModule } from '@angular/router';

import { MobileMenuService } from '../../../services/mobile-menu-service/mobile-menu.service';
import { MobileThemeMenuSheetComponent } from './mobile-theme-menu/mobile-theme-menu.component';
import { SocialLinksComponent } from '../../social-links/social-links.component';

import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MobileLangsMenuSheetComponent } from './mobile-langs-menu/mobile-langs-menu.component';
import { AudioService } from '../../../services/audio-service/audio.service';
import { ThemeService } from '../../../services/theme-service/theme.service';
import { Themes } from '../../../models/themes';

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

  private mobileMenuService: MobileMenuService;
  private translate: TranslateService;
  private snackBar: MatSnackBar;
  private audioService: AudioService;
  private themeService: ThemeService;

  constructor() {
    this.mobileMenuService = inject(MobileMenuService);
    this.translate = inject(TranslateService);
    this.snackBar = inject(MatSnackBar);
    this.audioService = inject(AudioService);
    this.themeService = inject(ThemeService);
  }

  public changeLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('lang', JSON.stringify(lang));

    lang === 'en-US'
      ? this.snackBar.open(`Language changed to en-US`, 'Close', {
          duration: 4000,
        })
      : this.snackBar.open(`Língua trocada para pt-BR`, 'Fechar', {
          duration: 4000,
        });
  }
  public get currentLang() {
    return this.translate.currentLang;
  }
  public get AllLangs(): string[] {
    return this.translate.getLangs();
  }

  ngAfterViewChecked() {
    this.mobileMenuService.setDrawer(this.mobileMenu);
    this.mobileMenuService.changePointerEvents();
  }

  toggleFromComponent() {
    this.mobileMenuService.toggleMobileMenu();
  }

  private _bottomSheet = inject(MatBottomSheet);

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
