import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogClose } from '@angular/material/dialog';

import { ThemeService } from '../../../../../../../../services/theme-service/theme.service';
import { Themes } from '../../../../../../../../models/themes';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tw3-dialog-colors',
  imports: [
    MatDividerModule,
    MatButtonModule,
    MatListModule,
    MatDialogClose,
    TranslateModule,
  ],
  templateUrl: './tw3-dialog-colors.component.html',
  styleUrls: ['./tw3-dialog-colors.component.scss', '../../dialog.scss'],
})
export class Tw3DialogColorsComponent implements OnInit, OnDestroy {
  private themeService: ThemeService;
  private themeSubscript!: Subscription;
  public actualTheme!: Themes;

  constructor() {
    this.themeService = inject(ThemeService);
  }
  ngOnInit(): void {
    this.themeSubscript = this.themeService.actualTheme$.subscribe((theme) => {
      this.actualTheme = theme;
    });
  }

  ngOnDestroy(): void {
    this.themeSubscript.unsubscribe();
  }
  public get colorsOptions(): Themes[] {
    return this.themeService.getColorsNames();
  }

  public changeTheme(theme: Themes) {
    this.themeService.changeTheme(theme);
  }
}
