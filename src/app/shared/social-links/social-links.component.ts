import { Component, inject, Input, input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { MatIconRegistry } from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-social-links',
  imports: [MatIconModule],
  templateUrl: './social-links.component.html',
  styleUrl: './social-links.component.scss',
})
export class SocialLinksComponent {
  @Input() svgColor: string = '#000';
}
