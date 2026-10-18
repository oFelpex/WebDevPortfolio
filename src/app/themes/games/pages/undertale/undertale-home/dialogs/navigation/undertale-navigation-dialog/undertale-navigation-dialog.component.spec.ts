import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UndertaleNavigationDialogComponent } from './undertale-navigation-dialog.component';

describe('UndertaleNavigationDialogComponent', () => {
  let component: UndertaleNavigationDialogComponent;
  let fixture: ComponentFixture<UndertaleNavigationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UndertaleNavigationDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UndertaleNavigationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
