import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UndertaleEffectComponent } from './undertale-effect.component';

describe('UndertaleEffectComponent', () => {
  let component: UndertaleEffectComponent;
  let fixture: ComponentFixture<UndertaleEffectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UndertaleEffectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UndertaleEffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
