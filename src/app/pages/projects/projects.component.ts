import { Component, inject, OnInit } from '@angular/core';

import { HeaderComponent } from '../../shared/header/header.component';
import { ProjectCardComponent } from './project-card/project-card.component';
import { allProjects, Projects } from '../../models/projects';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { LoadingService } from '../../services/loading-service/loading.service';
import { fadeInDownToUp } from '../../shared/animations/fade-animations';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-projects',
  imports: [
    HeaderComponent,
    ProjectCardComponent,
    TranslateModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatChipsModule,
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  animations: [fadeInDownToUp],
})
export class ProjectsComponent implements OnInit {
  public projects: Projects[] = allProjects;
  private loadingService: LoadingService;

  constructor() {
    this.loadingService = inject(LoadingService);
  }

  isLoading = false;
  ngOnInit() {
    this.loadingService.loading$.subscribe((loading) => {
      this.isLoading = loading;
    });
  }
}
