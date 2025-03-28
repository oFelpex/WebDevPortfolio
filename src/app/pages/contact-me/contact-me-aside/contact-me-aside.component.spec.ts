import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactMeAsideComponent } from './contact-me-aside.component';

describe('ContactMeAsideComponent', () => {
  let component: ContactMeAsideComponent;
  let fixture: ComponentFixture<ContactMeAsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactMeAsideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactMeAsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
