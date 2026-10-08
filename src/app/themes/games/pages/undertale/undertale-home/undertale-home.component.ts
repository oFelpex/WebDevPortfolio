import { DOCUMENT } from '@angular/common';
import { Component, inject, Renderer2 } from '@angular/core';
import { ThemeService } from '../../../../../services/theme-service/theme.service';
import { AudioService } from '../../../../../services/audio-service/audio.service';

@Component({
  selector: 'app-undertale-home',
  imports: [],
  templateUrl: './undertale-home.component.html',
  styleUrl: './undertale-home.component.scss',
})
export class UndertaleHomeComponent {
  private audioService: AudioService;
  private themeService: ThemeService;
  private renderer: Renderer2;
  private document: Document;

  constructor() {
    this.renderer = inject(Renderer2);
    this.document = inject(DOCUMENT);
    this.themeService = inject(ThemeService);
    this.audioService = inject(AudioService);
  }

  ngOnInit(): void {
    this.headerSetPosition();
    this.renderer.addClass(this.document.body, 'home-page');
  }

  ngOnDestroy(): void {
    this.headerRestaurePosition();
    this.renderer.removeClass(this.document.body, 'home-page');
  }

  private headerSetPosition() {
    const header = document.getElementById(
      'undertale-header',
    ) as HTMLHeadingElement;
    if (header) {
      header.style.display = 'none';
      header.style.visibility = 'hidden';
      header.style.height = '0px';
      header.style.minHeight = '0px';
    }
  }
  private headerRestaurePosition() {
    const header = document.getElementById(
      'undertale-header',
    ) as HTMLHeadingElement;
    if (header) {
      header.style.display = 'block';
      header.style.visibility = 'visible';
      header.style.height = '14vh';
      header.style.minHeight = '60px';
    }
  }
}
