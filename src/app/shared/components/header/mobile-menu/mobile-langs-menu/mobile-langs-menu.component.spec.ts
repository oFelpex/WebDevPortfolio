import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileLangsMenuSheetComponent } from './mobile-langs-menu.component';

describe('MobileLangsMenuComponent', () => {
  let component: MobileLangsMenuSheetComponent;
  let fixture: ComponentFixture<MobileLangsMenuSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileLangsMenuSheetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MobileLangsMenuSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
