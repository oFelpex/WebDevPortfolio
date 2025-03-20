import { Component } from '@angular/core';

import { SocialLinksComponent } from '../../../shared/social-links/social-links.component';

import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-first-half',
  imports: [SocialLinksComponent, MatDividerModule],
  templateUrl: './first-half.component.html',
  styleUrl: './first-half.component.scss',
})
export class FirstHalfComponent {}
