import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheWitcher3EffectComponent } from './the-witcher-3-effect.component';

describe('TheWitcher3EffectComponent', () => {
  let component: TheWitcher3EffectComponent;
  let fixture: ComponentFixture<TheWitcher3EffectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TheWitcher3EffectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TheWitcher3EffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
