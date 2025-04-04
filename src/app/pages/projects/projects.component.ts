import { Component, inject, OnDestroy, OnInit } from '@angular/core';

import { ProjectCardComponent } from './project-card/project-card.component';
import { allProjects, Projects } from '../../models/projects';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { LoadingService } from '../../services/loading-service/loading.service';
import {
  fadeIn_opacity_loading,
  fadeInDownToUp_query,
} from '../../shared/animations/fade-animations';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-projects',
  imports: [
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
  animations: [fadeInDownToUp_query, fadeIn_opacity_loading],
})
export class ProjectsComponent implements OnInit, OnDestroy {
  public projects: Projects[] = allProjects;
  private loadingService: LoadingService;
  private loadingSubscription!: Subscription;
  public isLoading!: Boolean;

  constructor() {
    this.loadingService = inject(LoadingService);
  }

  ngOnInit() {
    this.loadingSubscription = this.loadingService.loading$.subscribe(
      (loading) => {
        this.isLoading = loading;
      }
    );
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }
}
