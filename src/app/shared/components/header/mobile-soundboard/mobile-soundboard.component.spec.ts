import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSoundboardComponent } from './mobile-soundboard.component';

describe('MobileSoundboardComponent', () => {
  let component: MobileSoundboardComponent;
  let fixture: ComponentFixture<MobileSoundboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileSoundboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileSoundboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
