import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tw3NavBarComponent } from './tw3-header.component';

describe('Tw3NavBarComponent', () => {
  let component: Tw3NavBarComponent;
  let fixture: ComponentFixture<Tw3NavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tw3NavBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Tw3NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
