import { DOCUMENT, NgComponentOutlet } from '@angular/common';
import { Component, inject, Renderer2, signal, Type } from '@angular/core';
import { undertaleHomeVariations } from './variations/undertale-home-variations';

@Component({
  selector: 'app-undertale-home',
  imports: [NgComponentOutlet],
  templateUrl: './undertale-home.component.html',
  styleUrl: './undertale-home.component.scss',
})
export class UndertaleHomeComponent {
  private renderer: Renderer2;
  private document: Document;

  public variation = signal<Type<unknown> | null>(null);

  constructor() {
    this.renderer = inject(Renderer2);
    this.document = inject(DOCUMENT);
  }

  async ngOnInit(): Promise<void> {
    this.headerSetPosition();
    this.renderer.addClass(this.document.body, 'home-page');

    const index = Math.floor(Math.random() * undertaleHomeVariations.length);
    this.variation.set(await undertaleHomeVariations[index].component());
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
