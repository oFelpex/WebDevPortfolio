import { Component } from '@angular/core';

import { allPhotos, Photos } from '../../../models/photos';

@Component({
  selector: 'app-photos-footer',
  imports: [],
  templateUrl: './photos-footer.component.html',
  styleUrl: './photos-footer.component.scss',
})
export class PhotosFooterComponent {
  allPhotos: Photos[] = allPhotos;
}
