import { TestBed } from '@angular/core/testing';

import { MobileNavMenuService } from './mobile-nav-menu.service';

describe('MobileNavMenuService', () => {
  let service: MobileNavMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MobileNavMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
