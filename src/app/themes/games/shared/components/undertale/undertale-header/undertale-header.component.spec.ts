import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UndertaleHeaderComponent } from './undertale-header.component';

describe('UndertaleHeaderComponent', () => {
  let component: UndertaleHeaderComponent;
  let fixture: ComponentFixture<UndertaleHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UndertaleHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UndertaleHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
