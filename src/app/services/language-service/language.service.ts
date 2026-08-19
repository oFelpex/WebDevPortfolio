import { inject, Injectable } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private translate = inject(TranslateService);
  private browserLang = this.translate.getBrowserCultureLang();
  private readonly STORAGE_KEY = 'lang';
  private readonly DEFAULT_LANG = this.browserLang || 'en-US';
  private readonly SUPPORTED_LANGS = ['pt-BR', 'en-US'];

  public onLanguageChange$: Observable<LangChangeEvent> =
    this.translate.onLangChange;

  constructor() {
    this.initLanguage();
  }

  private initLanguage(): void {
    this.translate.addLangs(this.SUPPORTED_LANGS);
    this.translate.setDefaultLang(this.DEFAULT_LANG);

    const savedLang = localStorage.getItem(this.STORAGE_KEY);

    if (savedLang && this.SUPPORTED_LANGS.includes(savedLang)) {
      this.translate.use(savedLang);
    } else {
      this.setLanguage(this.DEFAULT_LANG);
    }
  }

  public setLanguage(lang: string): void {
    if (!this.SUPPORTED_LANGS.includes(lang)) {
      console.warn(`Language: '${lang}' is not supported.`);
      return;
    }

    this.translate.use(lang);
    localStorage.setItem(this.STORAGE_KEY, lang);
  }

  public getCurrentLanguage(): string {
    return this.translate.currentLang || this.DEFAULT_LANG;
  }

  public getSupportedLangs(): string[] {
    return this.SUPPORTED_LANGS;
  }
}
