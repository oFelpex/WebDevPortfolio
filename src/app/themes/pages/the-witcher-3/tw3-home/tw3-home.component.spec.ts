import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tw3HomeComponent } from './tw3-home.component';

describe('Tw3HomeComponent', () => {
  let component: Tw3HomeComponent;
  let fixture: ComponentFixture<Tw3HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tw3HomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tw3HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
