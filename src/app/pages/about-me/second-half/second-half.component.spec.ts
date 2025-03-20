import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondHalfComponent } from './second-half.component';

describe('SecondHalfComponent', () => {
  let component: SecondHalfComponent;
  let fixture: ComponentFixture<SecondHalfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecondHalfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondHalfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
