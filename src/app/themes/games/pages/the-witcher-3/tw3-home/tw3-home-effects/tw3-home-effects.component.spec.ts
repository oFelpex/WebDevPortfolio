import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tw3HomeEffectsComponent } from './tw3-home-effects.component';

describe('Tw3HomeEffectsComponent', () => {
  let component: Tw3HomeEffectsComponent;
  let fixture: ComponentFixture<Tw3HomeEffectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tw3HomeEffectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tw3HomeEffectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
