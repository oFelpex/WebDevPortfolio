import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroSectionComponent } from './intro-section.component';

describe('IntroSectionComponent', () => {
  let component: IntroSectionComponent;
  let fixture: ComponentFixture<IntroSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntroSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntroSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
