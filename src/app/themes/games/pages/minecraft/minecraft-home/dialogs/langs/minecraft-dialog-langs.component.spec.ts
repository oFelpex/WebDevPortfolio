import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinecraftDialogLangsComponent } from './minecraft-dialog-langs.component';

describe('MinecraftDialogLangsComponent', () => {
  let component: MinecraftDialogLangsComponent;
  let fixture: ComponentFixture<MinecraftDialogLangsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinecraftDialogLangsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MinecraftDialogLangsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
