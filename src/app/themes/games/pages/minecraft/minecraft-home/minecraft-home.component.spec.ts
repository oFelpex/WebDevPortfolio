import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinecraftHomeComponent } from './minecraft-home.component';

describe('MinecraftHomeComponent', () => {
  let component: MinecraftHomeComponent;
  let fixture: ComponentFixture<MinecraftHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinecraftHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinecraftHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
