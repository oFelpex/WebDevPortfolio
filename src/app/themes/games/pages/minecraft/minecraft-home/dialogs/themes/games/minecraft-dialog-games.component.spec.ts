import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinecraftDialogGamesComponent } from './minecraft-dialog-games.component';

describe('MinecraftDialogGamesComponent', () => {
  let component: MinecraftDialogGamesComponent;
  let fixture: ComponentFixture<MinecraftDialogGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinecraftDialogGamesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinecraftDialogGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
