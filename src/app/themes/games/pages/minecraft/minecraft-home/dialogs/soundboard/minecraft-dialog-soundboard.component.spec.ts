import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinecraftDialogSoundboardComponent } from './minecraft-dialog-soundboard.component';

describe('MinecraftDialogSoundboardComponent', () => {
  let component: MinecraftDialogSoundboardComponent;
  let fixture: ComponentFixture<MinecraftDialogSoundboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinecraftDialogSoundboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MinecraftDialogSoundboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
