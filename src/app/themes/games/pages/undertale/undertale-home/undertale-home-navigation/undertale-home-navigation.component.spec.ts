import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UndertaleHomeNavigationComponent } from './undertale-home-navigation.component';

describe('UndertaleHomeNavigationComponent', () => {
  let component: UndertaleHomeNavigationComponent;
  let fixture: ComponentFixture<UndertaleHomeNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UndertaleHomeNavigationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UndertaleHomeNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
