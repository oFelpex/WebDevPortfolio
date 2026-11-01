import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnowdinTorielComponent } from './snowdin-toriel.component';

describe('SnowdinTorielComponent', () => {
  let component: SnowdinTorielComponent;
  let fixture: ComponentFixture<SnowdinTorielComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnowdinTorielComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnowdinTorielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
