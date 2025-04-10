import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSoundboardButtonComponent } from './show-soundboard-button.component';

describe('ShowSoundboardButtonComponent', () => {
  let component: ShowSoundboardButtonComponent;
  let fixture: ComponentFixture<ShowSoundboardButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowSoundboardButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowSoundboardButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
