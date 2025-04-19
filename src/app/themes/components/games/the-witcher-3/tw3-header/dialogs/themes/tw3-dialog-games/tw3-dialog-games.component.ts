import { Component, inject } from '@angular/core';

import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogClose } from '@angular/material/dialog';

import { ThemeService } from '../../../../../../../../services/theme-service/theme.service';
import { Themes } from '../../../../../../../../models/themes';

@Component({
  selector: 'app-tw3-dialog-games',
  imports: [MatListModule, MatDividerModule, MatButtonModule, MatDialogClose],
  templateUrl: './tw3-dialog-games.component.html',
  styleUrls: ['./tw3-dialog-games.component.scss', '../../dialog.scss'],
})
export class Tw3DialogGamesComponent {
  themeService: ThemeService;

  constructor() {
    this.themeService = inject(ThemeService);
  }

  public get gamesOptions() {
    return this.themeService.getGamesNames();
  }
  public get actualTheme() {
    return this.themeService.getNameOfActualTheme().name;
  }

  public changeTheme(theme: Themes) {
    this.themeService.changeTheme(theme);
  }
}
