import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayProjectsComponent } from './overlay-projects.component';

describe('OverlayProjectsComponent', () => {
  let component: OverlayProjectsComponent;
  let fixture: ComponentFixture<OverlayProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverlayProjectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverlayProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
