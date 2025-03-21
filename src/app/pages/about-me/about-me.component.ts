import { Component, inject, OnInit } from '@angular/core';

import { HeaderComponent } from '../../shared/header/header.component';
import { FirstHalfComponent } from './first-half/first-half.component';
import { SecondHalfComponent } from './second-half/second-half.component';
import { PhotosFooterComponent } from './photos-footer/photos-footer.component';

import { MatDividerModule } from '@angular/material/divider';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { LoadingService } from '../../services/loading-service/loading.service';

@Component({
  selector: 'app-about-me',
  imports: [
    HeaderComponent,
    MatDividerModule,
    FirstHalfComponent,
    SecondHalfComponent,
    PhotosFooterComponent,
  ],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss',
  animations: [
    trigger('fadeInUpToDown', [
      state('loading', style({ opacity: 0, transform: 'translateY(-100px)' })),
      state(
        'loaded',
        style({
          opacity: 1,
          transform: 'translateY(0px)',
        })
      ),
      transition('loading => loaded', animate('300ms ease-in')),
    ]),
  ],
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
