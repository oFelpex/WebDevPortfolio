import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

import { Projects } from '../../../../models/projects';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AudioService } from '../../../../services/audio-service/audio.service';
import { ThemeService } from '../../../../services/theme-service/theme.service';
import { Themes } from '../../../../models/themes';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-overlay-projects',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './overlay-projects.component.html',
  styleUrl: './overlay-projects.component.scss',
  animations: [
    trigger('showOverlay', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms ease-in-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class OverlayProjectsComponent implements OnInit, OnDestroy {
  @Input() project!: Projects;
  @Input() isOverlayVisible: boolean = false;

  private audioService: AudioService;
  private themeService: ThemeService;
  private themeSubscription!: Subscription;

  public actualTheme!: Themes;

  constructor() {
    this.themeService = inject(ThemeService);
    this.audioService = inject(AudioService);
  }

  ngOnInit(): void {
    this.themeSubscription = this.themeService.actualTheme$.subscribe(
      (theme) => {
        this.actualTheme = theme;
      }
    );
  }
  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  public playClickSound(themeName: string) {
    this.audioService.playClickSound(themeName);
  }

  public goToProject() {
    window.open(this.project.siteURL, '_blank');
  }
}
