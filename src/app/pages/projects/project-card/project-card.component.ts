import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';

import { OverlayProjectsComponent } from './overlay-projects/overlay-projects.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Projects } from '../../../models/projects';
import { MatDividerModule } from '@angular/material/divider';
import { TranslateModule } from '@ngx-translate/core';
import { AudioService } from '../../../services/audio-service/audio.service';
import { ThemeService } from '../../../services/theme-service/theme.service';
import { Themes } from '../../../models/themes';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-card',
  imports: [
    OverlayProjectsComponent,
    TranslateModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatButtonModule,
  ],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
})
export class ProjectCardComponent implements OnInit, OnDestroy {
  @Input() project!: Projects;

  private audioService: AudioService;
  private themeService: ThemeService;
  private themeSubscription!: Subscription;

  public actualTheme!: Themes;
  public isOverlayVisible: boolean = false;

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

  public showOverlay() {
    this.isOverlayVisible = true;
  }

  public hideOverlay() {
    this.isOverlayVisible = false;
  }

  public goToProject(projectSiteURL: string) {
    window.open(projectSiteURL, '_blank');
  }
}
