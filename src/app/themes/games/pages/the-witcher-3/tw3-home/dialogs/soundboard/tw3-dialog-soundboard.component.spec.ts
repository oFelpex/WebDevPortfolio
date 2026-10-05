import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tw3DialogSoundboardComponent } from './tw3-dialog-soundboard.component';

describe('Tw3DialogSoundboardComponent', () => {
  let component: Tw3DialogSoundboardComponent;
  let fixture: ComponentFixture<Tw3DialogSoundboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tw3DialogSoundboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tw3DialogSoundboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
