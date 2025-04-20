import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinecraftHeaderComponent } from './minecraft-header.component';

describe('MinecraftHeaderComponent', () => {
  let component: MinecraftHeaderComponent;
  let fixture: ComponentFixture<MinecraftHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinecraftHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinecraftHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
