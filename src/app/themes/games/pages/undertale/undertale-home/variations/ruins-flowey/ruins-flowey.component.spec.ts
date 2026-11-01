import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuinsFloweyComponent } from './ruins-flowey.component';

describe('RuinsFloweyComponent', () => {
  let component: RuinsFloweyComponent;
  let fixture: ComponentFixture<RuinsFloweyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RuinsFloweyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RuinsFloweyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
