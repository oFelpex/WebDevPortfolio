import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreAlphysComponent } from './core-alphys.component';

describe('CoreAlphysComponent', () => {
  let component: CoreAlphysComponent;
  let fixture: ComponentFixture<CoreAlphysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoreAlphysComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreAlphysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
