import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ThemeService } from '../../../../../../../../services/theme-service/theme.service';
import { Subscription } from 'rxjs';
import { Themes } from '../../../../../../../../models/themes';
import { CommonModule } from '@angular/common';
import { AudioService } from '../../../../../../../../services/audio-service/audio.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

type themesSelectionMenu =
  | 'typeSelection'
  | 'GamesSelection'
  | 'ColorsSelection';
@Component({
  selector: 'app-undertale-themes-dialog',
  imports: [CommonModule, TranslateModule, MatDialogModule],
  templateUrl: './undertale-themes-dialog.component.html',
  styleUrl: './undertale-themes-dialog.component.scss',
})
export class UndertaleThemesDialogComponent implements OnInit, OnDestroy {
  private themeServiceSubscribe!: Subscription;
  private themeService: ThemeService;
  private audioService: AudioService;
  private dialog: MatDialog;

  public whatMenuItWillShow = signal<themesSelectionMenu>('typeSelection');

  public actualTheme!: Themes;
  public typesOfThemes!: string[];
  public gameOptions!: Themes[];
  public colorOptions!: Themes[];

  constructor() {
    this.themeService = inject(ThemeService);
    this.audioService = inject(AudioService);
    this.dialog = inject(MatDialog);
  }

  ngOnInit(): void {
    this.themeServiceSubscribe = this.themeService.actualTheme$.subscribe(
      (theme: Themes) => {
        this.actualTheme = theme;
      },
    );
    this.typesOfThemes = this.themeService.getThemesTypes();
    this.gameOptions = this.themeService.getGamesNames();
    this.colorOptions = this.themeService.getColorsNames();
  }
  ngOnDestroy(): void {
    this.themeServiceSubscribe.unsubscribe();
  }

  public playClickSound(): void {
    this.audioService.playClickSound('Undertale');
  }
  public mouseEnterOrLeaveSFX(): void {
    this.audioService.playSound('Undertale-mouseEnterOrLeave');
  }

  public changeWhatMenuItWillShow(type: string): void {
    const menuName = `${type}Selection` as themesSelectionMenu;
    this.whatMenuItWillShow.set(menuName);
  }
  public changeTheme(theme: Themes): void {
    this.themeService.changeTheme(theme);
    this.dialog.closeAll();
  }
}
