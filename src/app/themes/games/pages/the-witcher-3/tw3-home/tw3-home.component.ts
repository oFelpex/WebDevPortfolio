import { Component, inject } from '@angular/core';
import { LogoEffectsComponent } from '../../../../../logo-effects/logo-effects.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

import { AudioService } from '../../../../../services/audio-service/audio.service';
import { ThemeService } from '../../../../../services/theme-service/theme.service';
import { ResponsiveService } from '../../../../../services/responsive-service/responsive.service';
import { MatDialog } from '@angular/material/dialog';
import { TW3DialogsComponent } from '../../../shared/components/the-witcher-3/tw3-header/dialogs/tw3-dialogs.component';
import { Tw3HomeEffectsComponent } from './tw3-home-effects/tw3-home-effects.component';
@Component({
  selector: 'app-tw3-home',
  imports: [
    LogoEffectsComponent,
    Tw3HomeEffectsComponent,
    RouterModule,
    MatIconModule,
    TranslateModule,
  ],
  templateUrl: './tw3-home.component.html',
  styleUrl: './tw3-home.component.scss',
})
export class Tw3HomeComponent {
  private responsiveService: ResponsiveService;
  private dialog: MatDialog;
  private audioService: AudioService;
  private themeService: ThemeService;

  constructor() {
    this.themeService = inject(ThemeService);
    this.audioService = inject(AudioService);
    this.dialog = inject(MatDialog);
    this.responsiveService = inject(ResponsiveService);
  }

  ngOnInit(): void {
    this.headerSetPosition();
  }

  ngOnDestroy(): void {
    this.headerRestaurePosition();
  }

  public playClickSound(): void {
    this.audioService.playClickSound('The Witcher 3');
  }

  public openOptionsDialog(): void {
    this.playClickSound();
    this.dialog.open(TW3DialogsComponent, {
      data: {
        dialogType: 'HomeOptions',
      },
    });
  }

  public exitGame(): void {
    this.playClickSound();
    this.themeService.changeTheme({ name: 'Light', type: 'Colors' });
  }

  private headerSetPosition() {
    const header = document.getElementById('tw3-header') as HTMLHeadingElement;
    if (header) {
      header.style.display = 'none';
      header.style.visibility = 'hidden';
      header.style.height = '0px';
      header.style.minHeight = '0px';
    }
  }
  private headerRestaurePosition() {
    const header = document.getElementById('tw3-header') as HTMLHeadingElement;
    if (header) {
      header.style.display = 'block';
      header.style.visibility = 'visible';
      header.style.height = '14vh';
      header.style.minHeight = '60px';
    }
  }
}
