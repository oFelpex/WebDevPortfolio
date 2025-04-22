import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tw3DialogGamesComponent } from './tw3-dialog-games.component';

describe('Tw3DialogGamesComponent', () => {
  let component: Tw3DialogGamesComponent;
  let fixture: ComponentFixture<Tw3DialogGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tw3DialogGamesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tw3DialogGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
