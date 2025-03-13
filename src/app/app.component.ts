import { Component, inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'WebDevPortfolio';

  constructor() {
    const matIconRegistry = inject(MatIconRegistry);
    const domSanitizer = inject(DomSanitizer);

    const socialIcons = [
      'icon-linkedin',
      'icon-whatsapp',
      'icon-github',
      'icon-twitter',
    ];
    const hardSkillIcons = [
      'icon-html',
      'icon-css',
      'icon-scss',
      'icon-bootstrap',
      'icon-angular',
      'icon-js',
      'icon-ts',
      'icon-api',
    ];

    socialIcons.forEach((icon) => {
      matIconRegistry.addSvgIcon(
        icon,
        domSanitizer.bypassSecurityTrustResourceUrl(
          `assets/icons/social-icons/${icon}.svg`
        )
      );
    });
    hardSkillIcons.forEach((icon) => {
      matIconRegistry.addSvgIcon(
        icon,
        domSanitizer.bypassSecurityTrustResourceUrl(
          `assets/icons/hardskill-icons/${icon}.svg`
        )
      );
    });
  }
}
