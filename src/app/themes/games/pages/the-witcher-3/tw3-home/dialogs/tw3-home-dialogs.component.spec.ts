import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tw3HomeDialogsComponent } from './tw3-home-dialogs.component';

describe('Tw3DialogsComponent', () => {
  let component: Tw3HomeDialogsComponent;
  let fixture: ComponentFixture<Tw3HomeDialogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tw3HomeDialogsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Tw3HomeDialogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
