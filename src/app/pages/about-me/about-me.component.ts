import { Component } from '@angular/core';

import { HeaderComponent } from '../../shared/header/header.component';
import { SocialLinksComponent } from '../../shared/social-links/social-links.component';

import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-about-me',
  imports: [HeaderComponent, SocialLinksComponent, MatDividerModule],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss',
})
export class AboutMeComponent {}
