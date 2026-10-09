import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterfallPapyrusComponent } from './waterfall-papyrus.component';

describe('WaterfallPapyrusComponent', () => {
  let component: WaterfallPapyrusComponent;
  let fixture: ComponentFixture<WaterfallPapyrusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaterfallPapyrusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaterfallPapyrusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
