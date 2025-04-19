import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tw3DialogLangsComponent } from './tw3-dialog-langs.component';

describe('Tw3DialogLangsComponent', () => {
  let component: Tw3DialogLangsComponent;
  let fixture: ComponentFixture<Tw3DialogLangsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tw3DialogLangsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tw3DialogLangsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
