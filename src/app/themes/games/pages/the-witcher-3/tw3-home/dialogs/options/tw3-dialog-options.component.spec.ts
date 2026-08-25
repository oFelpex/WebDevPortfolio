import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tw3DialogOptionsComponent } from './tw3-dialog-options.component';

describe('Tw3DialogOptionsComponent', () => {
  let component: Tw3DialogOptionsComponent;
  let fixture: ComponentFixture<Tw3DialogOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tw3DialogOptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tw3DialogOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
