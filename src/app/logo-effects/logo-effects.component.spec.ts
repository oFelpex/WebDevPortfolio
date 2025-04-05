import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoEffectsComponent } from './logo-effects.component';

describe('LogoEffectsComponent', () => {
  let component: LogoEffectsComponent;
  let fixture: ComponentFixture<LogoEffectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoEffectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoEffectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
