import { Component, inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { LogoEffectsComponent } from '../../../../../logo-effects/logo-effects.component';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

import { AudioService } from '../../../../../services/audio-service/audio.service';
import { ThemeService } from '../../../../../services/theme-service/theme.service';
import { MatDialog } from '@angular/material/dialog';
import { TW3DialogsComponent } from '../../../shared/components/the-witcher-3/tw3-header/dialogs/tw3-dialogs.component';
import { Tw3HomeEffectsComponent } from './tw3-home-effects/tw3-home-effects.component';

type dialogType = 'HomeOptions' | 'HomeNavigate';
@Component({
  selector: 'app-tw3-home',
  imports: [
    LogoEffectsComponent,
    Tw3HomeEffectsComponent,
    MatIconModule,
    TranslateModule,
  ],
  templateUrl: './tw3-home.component.html',
  styleUrl: './tw3-home.component.scss',
})
export class Tw3HomeComponent implements OnInit, OnDestroy {
  private dialog: MatDialog;
  private audioService: AudioService;
  private themeService: ThemeService;
  private renderer: Renderer2;
  private document: Document;

  constructor() {
    this.renderer = inject(Renderer2);
    this.document = inject(DOCUMENT);
    this.themeService = inject(ThemeService);
    this.audioService = inject(AudioService);
    this.dialog = inject(MatDialog);
  }

  ngOnInit(): void {
    this.headerSetPosition();
    this.renderer.addClass(this.document.body, 'home-page');
  }

  ngOnDestroy(): void {
    this.headerRestaurePosition();
    this.renderer.removeClass(this.document.body, 'home-page');
  }

  public playClickSound(): void {
    this.audioService.playClickSound('The Witcher 3');
  }

  public openTypeDialog(dialogType: dialogType): void {
    this.playClickSound();
    this.dialog.open(TW3DialogsComponent, {
      data: {
        dialogType: dialogType,
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
