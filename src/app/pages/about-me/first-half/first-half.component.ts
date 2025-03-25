import { Component } from '@angular/core';

import { SocialLinksComponent } from '../../../shared/social-links/social-links.component';

import { MatDividerModule } from '@angular/material/divider';

import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-first-half',
  imports: [SocialLinksComponent, MatDividerModule, TranslateModule],
  templateUrl: './first-half.component.html',
  styleUrl: './first-half.component.scss',
})
export class FirstHalfComponent {}
