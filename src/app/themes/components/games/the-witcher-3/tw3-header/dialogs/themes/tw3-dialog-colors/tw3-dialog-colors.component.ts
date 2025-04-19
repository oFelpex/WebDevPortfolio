import { Component, inject } from '@angular/core';

import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

import { ThemeService } from '../../../../../../../../services/theme-service/theme.service';

@Component({
  selector: 'app-tw3-dialog-colors',
  imports: [MatDividerModule, MatButtonModule, MatListModule],
  templateUrl: './tw3-dialog-colors.component.html',
  styleUrls: ['./tw3-dialog-colors.component.scss', '../../dialog.scss'],
})
export class Tw3DialogColorsComponent {
  themeService: ThemeService;

  constructor() {
    this.themeService = inject(ThemeService);
  }

  public get colorsOptions() {
    return this.themeService.getColorsNames();
  }
  public get actualTheme() {
    return this.themeService.getNameOfActualTheme().name;
  }
}
