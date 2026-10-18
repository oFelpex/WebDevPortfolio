import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UndertaleSoundboardDialogComponent } from './undertale-soundboard-dialog.component';

describe('UndertaleSoundboardDialogComponent', () => {
  let component: UndertaleSoundboardDialogComponent;
  let fixture: ComponentFixture<UndertaleSoundboardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UndertaleSoundboardDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UndertaleSoundboardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
