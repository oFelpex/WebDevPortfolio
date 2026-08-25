import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tw3DialogNavigateComponent } from './tw3-dialog-navigate.component';

describe('Tw3DialogNavigateComponent', () => {
  let component: Tw3DialogNavigateComponent;
  let fixture: ComponentFixture<Tw3DialogNavigateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tw3DialogNavigateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tw3DialogNavigateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
