import { Component, inject } from '@angular/core';
import { MobileNavMenuService } from '../../../../../../services/mobile-menu-service/mobile-nav-menu.service';
import { MobileSoundboardMenuService } from '../../../../../../services/mobile-soundboard-menu/mobile-soundboard-menu.service';
import { ResponsiveService } from '../../../../../../services/responsive-service/responsive.service';
import { AudioService } from '../../../../../../services/audio-service/audio.service';
import { MobileMenuComponent } from '../../../../../../shared/components/header/mobile-menu/mobile-menu.component';
import { LogoEffectsComponent } from '../../../../../../logo-effects/logo-effects.component';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SFXs, undertaleSFX } from '../../../../../../models/sfxs';

@Component({
  selector: 'app-undertale-header',
  imports: [
    MobileMenuComponent,
    LogoEffectsComponent,
    RouterLink,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './undertale-header.component.html',
  styleUrl: './undertale-header.component.scss',
})
export class UndertaleHeaderComponent {
  private mobileNavMenuService: MobileNavMenuService;
  private mobileSoundboardMenuService: MobileSoundboardMenuService;
  private responsiveService: ResponsiveService;
  private audioService: AudioService;
  private router: Router;
  private undertaleSFXHome: SFXs[] = undertaleSFX;

  public isMobile: boolean = window.innerWidth <= 820;

  constructor() {
    this.audioService = inject(AudioService);
    this.mobileNavMenuService = inject(MobileNavMenuService);
    this.mobileSoundboardMenuService = inject(MobileSoundboardMenuService);
    this.responsiveService = inject(ResponsiveService);
    this.router = inject(Router);
  }
  ngOnInit(): void {
    this.undertaleSFXHome.map((SFX) =>
      this.audioService.preloadSound(SFX.SFXName, SFX.SFXURL),
    );
  }
  public mouseEnterOrLeaveSFX(): void {
    this.audioService.playSound('Undertale-mouseEnterOrLeave');
  }
  public playClickSound(): void {
    this.audioService.playClickSound('Undertale');
  }

  public goToHomeMenu(menu: 'soundboard' | 'configMenu'): void {
    this.playClickSound();
    this.router.navigate(['/home'], { queryParams: { menu } });
  }
}
