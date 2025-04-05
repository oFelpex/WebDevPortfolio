import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinecraftEffectComponent } from './minecraft-effect.component';

describe('MinecraftComponent', () => {
  let component: MinecraftEffectComponent;
  let fixture: ComponentFixture<MinecraftEffectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinecraftEffectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MinecraftEffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
