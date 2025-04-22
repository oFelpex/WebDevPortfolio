import { Component, Inject, inject, OnDestroy, OnInit } from '@angular/core';
import { ThemeService } from '../../../services/theme-service/theme.service';
import { AudioService } from '../../../services/audio-service/audio.service';
import { Themes } from '../../../models/themes';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-custom-snackbar',
  imports: [MatButtonModule, TranslateModule],
  templateUrl: './custom-snackbar.component.html',
  styleUrl: './custom-snackbar.component.scss',
})
export class CustomSnackbarComponent implements OnInit, OnDestroy {
  private audioService: AudioService;
  private themeService: ThemeService;
  private snackBarRef: MatSnackBarRef<CustomSnackbarComponent>;
  private themeSubscript!: Subscription;

  public actualTheme!: Themes;
  public message: string;
  public themeNameMessage: string;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.themeService = inject(ThemeService);
    this.audioService = inject(AudioService);
    this.snackBarRef = inject(MatSnackBarRef<CustomSnackbarComponent>);
    this.message = data.message;
    this.themeNameMessage = data.themeNameMessage;
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

  public dismiss(): void {
    this.snackBarRef.dismiss();
  }
}
