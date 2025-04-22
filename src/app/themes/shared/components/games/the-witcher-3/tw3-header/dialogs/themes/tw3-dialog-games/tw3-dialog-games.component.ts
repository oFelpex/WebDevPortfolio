import { Component, inject, OnDestroy, OnInit } from '@angular/core';

import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogClose } from '@angular/material/dialog';

import { ThemeService } from '../../../../../../../../../services/theme-service/theme.service';
import { Themes } from '../../../../../../../../../models/themes';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tw3-dialog-games',
  imports: [MatListModule, MatDividerModule, MatButtonModule, MatDialogClose],
  templateUrl: './tw3-dialog-games.component.html',
  styleUrls: ['./tw3-dialog-games.component.scss', '../../dialog.scss'],
})
export class Tw3DialogGamesComponent implements OnInit, OnDestroy {
  private themeService: ThemeService;
  private themeSubscription!: Subscription;
  public actualTheme!: Themes;

  constructor() {
    this.themeService = inject(ThemeService);
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

  public get gamesOptions() {
    return this.themeService.getGamesNames();
  }

  public changeTheme(theme: Themes) {
    this.themeService.changeTheme(theme);
  }
}
