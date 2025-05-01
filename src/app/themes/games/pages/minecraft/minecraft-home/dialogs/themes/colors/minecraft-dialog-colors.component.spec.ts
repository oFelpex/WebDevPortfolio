import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinecraftDialogColorsComponent } from './minecraft-dialog-colors.component';

describe('MinecraftDialogColorsComponent', () => {
  let component: MinecraftDialogColorsComponent;
  let fixture: ComponentFixture<MinecraftDialogColorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinecraftDialogColorsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MinecraftDialogColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
