import {
  AfterViewChecked,
  Component,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
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
import { LogoEffectsComponent } from '../../../../logo-effects/logo-effects.component';
import { Subscription } from 'rxjs';
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
    LogoEffectsComponent,
  ],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.scss',
})
export class MobileMenuComponent
  implements OnInit, OnDestroy, AfterViewChecked
{
  @ViewChild('mobileNavMenu') mobileNavMenu!: MatDrawer;

  private mobileNavMenuService: MobileNavMenuService;
  private audioService: AudioService;
  private themeService: ThemeService;
  private _bottomSheet: MatBottomSheet;
  private themeSubscript!: Subscription;

  public actualTheme!: Themes;

  constructor() {
    this.mobileNavMenuService = inject(MobileNavMenuService);
    this.audioService = inject(AudioService);
    this.themeService = inject(ThemeService);
    this._bottomSheet = inject(MatBottomSheet);
  }
  ngOnInit(): void {
    this.themeSubscript = this.themeService.actualTheme$.subscribe((theme) => {
      this.actualTheme = theme;
    });
  }
  ngOnDestroy(): void {
    this.themeSubscript.unsubscribe();
  }

  ngAfterViewChecked() {
    this.mobileNavMenuService.setMobileNavDrawer(this.mobileNavMenu);

    this.mobileNavMenuService.changeMobileNavPointerEvents();
  }

  public openThemeMenu(): void {
    window.scrollTo({ top: 0 });
    this._bottomSheet.open(MobileThemeMenuSheetComponent);
  }
  public openLangsMenu(): void {
    window.scrollTo({ top: 0 });
    this._bottomSheet.open(MobileLangsMenuSheetComponent);
  }

  public closeNavMenu() {
    this.mobileNavMenuService.toggleMobileNavMenu();
  }

  public get typeOfActualTheme(): string {
    return this.themeService.getTypeOfActualTheme();
  }

  public playClickSound(themeName: string) {
    this.audioService.playClickSound(themeName);
  }
}
