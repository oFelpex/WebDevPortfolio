import { Component, inject } from '@angular/core';
import { SocialLinksComponent } from '../../../shared/social-links/social-links.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact-me-aside',
  imports: [SocialLinksComponent, TranslateModule, MatTooltipModule],
  templateUrl: './contact-me-aside.component.html',
  styleUrl: './contact-me-aside.component.scss',
})
export class ContactMeAsideComponent {
  private snackBar: MatSnackBar;
  private translate: TranslateService;

  constructor() {
    this.snackBar = inject(MatSnackBar);
    this.translate = inject(TranslateService);
  }

  public clickToCopy(text: string) {
    switch (text) {
      case 'email':
        navigator.clipboard.writeText(`felipe95176@gmail.com`);
        if (this.translate.currentLang === 'en') {
          this.snackBar.open('Email copied to clipboard!', 'Close', {
            duration: 4000,
          });
        } else {
          this.snackBar.open(
            'E-mail copiado para a área de transferência!',
            'Fechar',
            {
              duration: 4000,
            }
          );
        }
        break;
      case 'number':
        navigator.clipboard.writeText(`+55 84 98709-5902`);
        if (this.translate.currentLang === 'en') {
          this.snackBar.open('Number copied to clipboard!', 'Close', {
            duration: 4000,
          });
        } else {
          this.snackBar.open(
            'Número copiado para a área de transferência!',
            'Fechar',
            {
              duration: 4000,
            }
          );
        }
        break;
    }
  }
}
