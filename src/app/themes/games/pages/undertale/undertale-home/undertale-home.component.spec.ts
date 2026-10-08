import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UndertaleHomeComponent } from './undertale-home.component';

describe('UndertaleHomeComponent', () => {
  let component: UndertaleHomeComponent;
  let fixture: ComponentFixture<UndertaleHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UndertaleHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UndertaleHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
