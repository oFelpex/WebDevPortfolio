import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';

import { AudioService } from '../../../../../../../services/audio-service/audio.service';

@Component({
  selector: 'app-minecraft-dialog-langs',
  imports: [MatListModule, FormsModule, MatRadioModule],
  templateUrl: './minecraft-dialog-langs.component.html',
  styleUrls: [
    './minecraft-dialog-langs.component.scss',
    '../minecraft-dialog.scss',
  ],
})
export class MinecraftDialogLangsComponent {
  private translateService: TranslateService;
  private audioService: AudioService;
  private translateSubscribe!: Subscription;
  public allLangs: string[] = [];
  public currentLang!: string;

  constructor() {
    this.translateService = inject(TranslateService);
    this.audioService = inject(AudioService);
    this.allLangs = this.translateService.getLangs();
  }

  ngOnInit(): void {
    this.currentLang = this.translateService.currentLang;
    this.translateSubscribe = this.translateService.onLangChange.subscribe(
      () => {
        this.currentLang = this.translateService.currentLang;
      }
    );
  }

  ngOnDestroy(): void {
    this.translateSubscribe.unsubscribe();
  }

  public playClickSound(): void {
    this.audioService.playClickSound('Minecraft');
  }

  public changeLang(lang: string) {
    this.translateService.use(lang);
  }
}
