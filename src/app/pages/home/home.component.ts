import { Component, inject, OnDestroy, OnInit } from '@angular/core';

import { IntroSectionComponent } from './intro-section/intro-section.component';
import { fadeIn_opacity_loading } from '../../shared/animations/fade-animations';
import { LoadingService } from '../../services/loading-service/loading.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-home',
  imports: [IntroSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [fadeIn_opacity_loading],
})
export class HomeComponent implements OnInit, OnDestroy {
  private loadingService: LoadingService;
  public isLoading!: boolean;
  private loadingSubscription!: Subscription;

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
