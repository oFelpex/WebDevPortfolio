import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosFooterComponent } from './photos-footer.component';

describe('PhotosFooterComponent', () => {
  let component: PhotosFooterComponent;
  let fixture: ComponentFixture<PhotosFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotosFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotosFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
