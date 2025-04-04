import { Component, inject, OnInit } from '@angular/core';

import { FirstHalfComponent } from './first-half/first-half.component';
import { SecondHalfComponent } from './second-half/second-half.component';
import { PhotosFooterComponent } from './photos-footer/photos-footer.component';

import { MatDividerModule } from '@angular/material/divider';
import { LoadingService } from '../../services/loading-service/loading.service';
import { fadeInUpToDown_loading } from '../../shared/animations/fade-animations';
@Component({
  selector: 'app-about-me',
  imports: [
    MatDividerModule,
    FirstHalfComponent,
    SecondHalfComponent,
    PhotosFooterComponent,
  ],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss',
  animations: [fadeInUpToDown_loading],
})
export class AboutMeComponent implements OnInit {
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
