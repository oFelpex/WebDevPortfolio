import { Component, inject } from '@angular/core';

import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogClose } from '@angular/material/dialog';

import { ThemeService } from '../../../../../../../../services/theme-service/theme.service';
import { Themes } from '../../../../../../../../models/themes';

@Component({
  selector: 'app-tw3-dialog-colors',
  imports: [MatDividerModule, MatButtonModule, MatListModule, MatDialogClose],
  templateUrl: './tw3-dialog-colors.component.html',
  styleUrls: ['./tw3-dialog-colors.component.scss', '../../dialog.scss'],
})
export class Tw3DialogColorsComponent {
  themeService: ThemeService;

  constructor() {
    this.themeService = inject(ThemeService);
  }

  public get colorsOptions(): Themes[] {
    return this.themeService.getColorsNames();
  }
  public get actualTheme(): string {
    return this.themeService.getNameOfActualTheme().name;
  }

  public changeTheme(theme: Themes) {
    this.themeService.changeTheme(theme);
  }
}
