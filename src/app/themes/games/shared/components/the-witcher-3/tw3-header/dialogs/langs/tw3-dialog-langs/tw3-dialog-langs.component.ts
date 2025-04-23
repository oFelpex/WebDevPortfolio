import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
@Component({
  selector: 'app-tw3-dialog-langs',
  imports: [MatListModule, MatButtonModule],
  templateUrl: './tw3-dialog-langs.component.html',
  styleUrls: ['./tw3-dialog-langs.component.scss', '../../dialog.scss'],
})
export class Tw3DialogLangsComponent {
  private translateService: TranslateService;
  private translateSubscribe!: Subscription;
  public allLangs: string[] = [];
  public currentLang!: string;

  constructor() {
    this.translateService = inject(TranslateService);
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

  public changeLang(lang: string) {
    this.translateService.use(lang);
  }
}
