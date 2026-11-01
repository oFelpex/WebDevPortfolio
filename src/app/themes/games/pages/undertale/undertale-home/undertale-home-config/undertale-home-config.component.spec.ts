import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UndertaleHomeConfigComponent } from './undertale-home-config.component';

describe('UndertaleHomeConfigComponent', () => {
  let component: UndertaleHomeConfigComponent;
  let fixture: ComponentFixture<UndertaleHomeConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UndertaleHomeConfigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UndertaleHomeConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
