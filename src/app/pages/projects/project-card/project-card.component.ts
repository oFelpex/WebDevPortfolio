import { Component, Input } from '@angular/core';

import { OverlayProjectsComponent } from './overlay-projects/overlay-projects.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Projects } from '../../../models/projects';
import { MatDividerModule } from '@angular/material/divider';
import { TranslateModule } from '@ngx-translate/core';

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
export class ProjectCardComponent {
  @Input() project!: Projects;
  isOverlayVisible: Boolean = false;

  showOverlay() {
    this.isOverlayVisible = true;
  }

  hideOverlay() {
    this.isOverlayVisible = false;
  }
}
