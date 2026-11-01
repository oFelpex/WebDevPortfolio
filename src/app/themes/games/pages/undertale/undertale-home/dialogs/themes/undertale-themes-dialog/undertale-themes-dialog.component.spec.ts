import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UndertaleThemesDialogComponent } from './undertale-themes-dialog.component';

describe('UndertaleThemesDialogComponent', () => {
  let component: UndertaleThemesDialogComponent;
  let fixture: ComponentFixture<UndertaleThemesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UndertaleThemesDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UndertaleThemesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
