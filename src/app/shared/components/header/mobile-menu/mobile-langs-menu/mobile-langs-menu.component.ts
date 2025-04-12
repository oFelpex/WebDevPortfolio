import { Component, inject } from '@angular/core';
import { Themes } from '../../../../../models/themes';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MobileMenuComponent } from '../mobile-menu.component';
import { ThemeService } from '../../../../../services/theme-service/theme.service';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import {
  LangChangeEvent,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AudioService } from '../../../../../services/audio-service/audio.service';
import { CustomSnackbarComponent } from '../../../../components/custom-snackbar/custom-snackbar.component';
import { ResponsiveService } from '../../../../../services/responsive-service/responsive.service';

@Component({
  selector: 'app-mobile-langs-menu',
  imports: [
    MatListModule,
    MatExpansionModule,
    MatButtonModule,
    MatBadgeModule,
    MatDividerModule,
    TranslateModule,
  ],
  templateUrl: './mobile-langs-menu.component.html',
  styleUrl: './mobile-langs-menu.component.scss',
})
export class MobileLangsMenuSheetComponent {
  private translate: TranslateService;
  private translateSubscription!: Subscription;
  private snackBar: MatSnackBar;
  public currentLang!: string;
  private audioService: AudioService;
  private themeService: ThemeService;
  private responsiveService: ResponsiveService;

  public isMobile: boolean = window.innerWidth <= 820;

  constructor() {
    this.translate = inject(TranslateService);
    this.snackBar = inject(MatSnackBar);
    this.themeService = inject(ThemeService);
    this.audioService = inject(AudioService);
    this.responsiveService = inject(ResponsiveService);
  }

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang;

    this.translateSubscription = this.translate.onLangChange
      .asObservable()
      .subscribe((event: LangChangeEvent) => {
        this.currentLang = event.lang;
      });

    this.responsiveService.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
      if (!isMobile && this._bottomSheetRef.instance)
        this._bottomSheetRef.dismiss();
    });
  }

  ngOnDestroy(): void {
    this.translateSubscription.unsubscribe();
  }

  public changeLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('lang', JSON.stringify(lang));

    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      data: {
        message: 'SNACK-BAR.NAV-MOBILE.CHANGE-LANG',
        theme: this.getNameOfActualThemeFromLocalStorage.name,
      },
      duration: 4000,
    });

    this._bottomSheetRef.dismiss();
  }
  public get AllLangs(): string[] {
    return this.translate.getLangs();
  }

  private _bottomSheetRef =
    inject<MatBottomSheetRef<MobileMenuComponent>>(MatBottomSheetRef);

  public get getNameOfActualThemeFromLocalStorage(): Themes {
    return this.themeService.getNameOfActualTheme();
  }
  public playClickSound(themeName: string) {
    this.audioService.playClickSound(themeName);
  }
}
