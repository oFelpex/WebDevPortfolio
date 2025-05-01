import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TW3DialogsComponent } from './tw3-dialogs.component';

describe('DialogsComponent', () => {
  let component: TW3DialogsComponent;
  let fixture: ComponentFixture<TW3DialogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TW3DialogsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TW3DialogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
