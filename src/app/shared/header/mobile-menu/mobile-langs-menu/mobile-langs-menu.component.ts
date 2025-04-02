import { Component, HostListener, inject } from '@angular/core';
import { Themes } from '../../../../models/themes';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MobileMenuComponent } from '../mobile-menu.component';
import { ThemeService } from '../../../../services/theme-service/theme.service';
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
import { AudioService } from '../../../../services/audio-service/audio.service';

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

  constructor() {
    this.translate = inject(TranslateService);
    this.snackBar = inject(MatSnackBar);
    this.themeService = inject(ThemeService);
    this.audioService = inject(AudioService);
  }

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang;

    this.translateSubscription = this.translate.onLangChange
      .asObservable()
      .subscribe((event: LangChangeEvent) => {
        this.currentLang = event.lang;
      });
  }

  ngOnDestroy(): void {
    this.translateSubscription.unsubscribe();
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
    this._bottomSheetRef.dismiss();
  }
  public get AllLangs(): string[] {
    return this.translate.getLangs();
  }

  private _bottomSheetRef =
    inject<MatBottomSheetRef<MobileMenuComponent>>(MatBottomSheetRef);
  isMobile: boolean = window.innerWidth <= 820;

  public get getNameOfActualThemeFromLocalStorage(): Themes {
    return this.themeService.getNameOfActualTheme();
  }
  public playClickSound(themeName: string) {
    this.audioService.playClickSound(themeName);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = event.target.innerWidth <= 820;
    if (!this.isMobile) {
      this._bottomSheetRef.dismiss();
    }
  }
}
