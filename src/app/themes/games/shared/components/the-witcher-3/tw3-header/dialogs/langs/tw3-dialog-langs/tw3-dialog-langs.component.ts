import { Component, inject } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { LanguageService } from '../../../../../../../../../services/language-service/language.service';
@Component({
  selector: 'app-tw3-dialog-langs',
  imports: [MatListModule, MatButtonModule],
  templateUrl: './tw3-dialog-langs.component.html',
  styleUrls: ['./tw3-dialog-langs.component.scss', '../../tw3-dialog.scss'],
})
export class Tw3DialogLangsComponent {
  private languageService: LanguageService;

  constructor() {
    this.languageService = inject(LanguageService);
  }

  ngOnInit(): void {}

  public get currentLang(): string {
    return this.languageService.getCurrentLanguage();
  }
  public get allLangs(): string[] {
    return this.languageService.getSupportedLangs();
  }
  public changeLang(lang: string) {
    this.languageService.setLanguage(lang);
  }
}
