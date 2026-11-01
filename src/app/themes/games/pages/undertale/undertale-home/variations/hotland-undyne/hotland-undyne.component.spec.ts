import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotlandUndyneComponent } from './hotland-undyne.component';

describe('HotlandUndyneComponent', () => {
  let component: HotlandUndyneComponent;
  let fixture: ComponentFixture<HotlandUndyneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotlandUndyneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotlandUndyneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
