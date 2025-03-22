import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPhotoFullScreenComponent } from './dialog-photo-full-screen.component';

describe('DialogPhotoFullScreenComponent', () => {
  let component: DialogPhotoFullScreenComponent;
  let fixture: ComponentFixture<DialogPhotoFullScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogPhotoFullScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogPhotoFullScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
