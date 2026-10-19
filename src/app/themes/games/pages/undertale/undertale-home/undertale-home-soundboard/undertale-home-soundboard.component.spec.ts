import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UndertaleHomeSoundboardComponent } from './undertale-home-soundboard.component';

describe('UndertaleHomeSoundboardComponent', () => {
  let component: UndertaleHomeSoundboardComponent;
  let fixture: ComponentFixture<UndertaleHomeSoundboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UndertaleHomeSoundboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UndertaleHomeSoundboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
