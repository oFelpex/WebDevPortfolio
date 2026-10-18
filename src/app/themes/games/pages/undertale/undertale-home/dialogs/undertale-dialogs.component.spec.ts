import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UndertaleDialogsComponent } from './undertale-dialogs.component';

describe('UndertaleDialogsComponent', () => {
  let component: UndertaleDialogsComponent;
  let fixture: ComponentFixture<UndertaleDialogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UndertaleDialogsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UndertaleDialogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
