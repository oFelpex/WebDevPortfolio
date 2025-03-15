import { Component, Input } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

import { Projects } from '../../../../models/projects';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

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
export class OverlayProjectsComponent {
  @Input() project!: Projects;
  @Input() isOverlayVisible: Boolean = false;

  goToProject() {
    window.open(this.project.siteURL, '_blank');
  }
}
