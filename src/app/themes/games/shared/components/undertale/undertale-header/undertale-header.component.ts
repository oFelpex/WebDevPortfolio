import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ResponsiveService } from '../../../../../../services/responsive-service/responsive.service';
import { AudioService } from '../../../../../../services/audio-service/audio.service';
import { LogoEffectsComponent } from '../../../../../../logo-effects/logo-effects.component';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { SFXs, undertaleSFX } from '../../../../../../models/sfxs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-undertale-header',
  imports: [
    LogoEffectsComponent,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
  ],
  templateUrl: './undertale-header.component.html',
  styleUrl: './undertale-header.component.scss',
})
export class UndertaleHeaderComponent implements OnInit, OnDestroy {
  private responsiveService: ResponsiveService;
  private responsiveSubscriber!: Subscription;
  private audioService: AudioService;
  private router: Router;
  private undertaleSFXHome: SFXs[] = undertaleSFX;

  public isMobile: boolean = window.innerWidth <= 820;

  constructor() {
    this.audioService = inject(AudioService);
    this.responsiveService = inject(ResponsiveService);
    this.router = inject(Router);
  }
  ngOnInit(): void {
    this.undertaleSFXHome.map((SFX) =>
      this.audioService.preloadSound(SFX.SFXName, SFX.SFXURL),
    );

    this.responsiveSubscriber = this.responsiveService.isMobile$.subscribe(
      (isMobile) => (this.isMobile = isMobile),
    );
  }
  ngOnDestroy(): void {
    this.responsiveSubscriber.unsubscribe();
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
