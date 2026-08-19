import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';

import { AudioService } from '../../../../../../../services/audio-service/audio.service';
import { LanguageService } from '../../../../../../../services/language-service/language.service';

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
  private languageService: LanguageService;

  private audioService: AudioService;

  constructor() {
    this.languageService = inject(LanguageService);
    this.audioService = inject(AudioService);
  }

  public playClickSound(): void {
    this.audioService.playClickSound('Minecraft');
  }

  public get currentLang(): string {
    return this.languageService.getCurrentLanguage();
  }
  public set currentLang(lang: string) {
    this.changeLang(lang);
  }
  public get allLangs(): string[] {
    return this.languageService.getSupportedLangs();
  }
  public changeLang(lang: string) {
    this.languageService.setLanguage(lang);
    this.playClickSound();
  }
}
