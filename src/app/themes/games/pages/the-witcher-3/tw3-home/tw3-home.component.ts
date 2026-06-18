import { Component } from '@angular/core';
import { LogoEffectsComponent } from "../../../../../logo-effects/logo-effects.component";

@Component({
  selector: 'app-tw3-home',
  imports: [LogoEffectsComponent],
  templateUrl: './tw3-home.component.html',
  styleUrl: './tw3-home.component.scss'
})
export class Tw3HomeComponent {
  ngOnInit(): void {
    this.headerSetPosition();
  }

  ngOnDestroy(): void {
    this.headerRestaurePosition();
  }

  private headerSetPosition() {
    const header = document.getElementById(
      'tw3-header'
    ) as HTMLHeadingElement;
    if (header) {
      header.style.display = 'none';
      header.style.visibility = 'hidden';
      header.style.height = '0px';
      header.style.minHeight = '0px';
    }

    const body = document.querySelector('.the-witcher-3-theme') as HTMLElement;
    if(body) {
      body.style.backgroundImage = "url('../../../../assets/themes/games/the witcher 3/backgrounds/tw3-bg-home.jpg')";
    }
  }
  private headerRestaurePosition() {
    const header = document.getElementById(
      'tw3-header'
    ) as HTMLHeadingElement;

    if (header) {
      header.style.display = 'block';
      header.style.visibility = 'visible';
      header.style.height = '14vh';
      header.style.minHeight = '60px';
    }
    const body = document.querySelector('.the-witcher-3-theme') as HTMLElement;
    if(body) {
      body.style.backgroundImage = "url('../../../../assets/themes/games/the witcher 3/backgrounds/tw3-bg.webp')";
    }
  }
}
