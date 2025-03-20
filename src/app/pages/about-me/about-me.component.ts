import { Component } from '@angular/core';

import { HeaderComponent } from '../../shared/header/header.component';
import { FirstHalfComponent } from './first-half/first-half.component';
import { SecondHalfComponent } from './second-half/second-half.component';
import { PhotosFooterComponent } from './photos-footer/photos-footer.component';

import { MatDividerModule } from '@angular/material/divider';

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
})
export class AboutMeComponent {}
