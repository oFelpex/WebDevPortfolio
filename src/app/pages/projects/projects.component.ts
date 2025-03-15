import { Component } from '@angular/core';

import { HeaderComponent } from '../../shared/header/header.component';
import { ProjectCardComponent } from './project-card/project-card.component';
import { allProjects, Projects } from '../../models/projects';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-projects',
  imports: [
    HeaderComponent,
    ProjectCardComponent,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatChipsModule,
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  public projects: Projects[] = allProjects;
}
