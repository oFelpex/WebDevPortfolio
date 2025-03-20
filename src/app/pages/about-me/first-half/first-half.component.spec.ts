import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstHalfComponent } from './first-half.component';

describe('FirstHalfComponent', () => {
  let component: FirstHalfComponent;
  let fixture: ComponentFixture<FirstHalfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirstHalfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstHalfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
