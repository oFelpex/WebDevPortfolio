import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinecraftDialogsComponent } from './minecraft-dialogs.component';

describe('MinecraftDialogsComponent', () => {
  let component: MinecraftDialogsComponent;
  let fixture: ComponentFixture<MinecraftDialogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinecraftDialogsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinecraftDialogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
