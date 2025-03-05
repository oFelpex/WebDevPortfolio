import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileThemeMenuSheetComponent } from './mobile-theme-menu.component';

describe('MobileThemeMenuComponent', () => {
  let component: MobileThemeMenuSheetComponent;
  let fixture: ComponentFixture<MobileThemeMenuSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileThemeMenuSheetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MobileThemeMenuSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
