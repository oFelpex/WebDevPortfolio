import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tw3DialogColorsComponent } from './tw3-dialog-colors.component';

describe('Tw3DialogColorsComponent', () => {
  let component: Tw3DialogColorsComponent;
  let fixture: ComponentFixture<Tw3DialogColorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tw3DialogColorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tw3DialogColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
