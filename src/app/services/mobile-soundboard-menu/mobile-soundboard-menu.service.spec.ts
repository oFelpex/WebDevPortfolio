import { TestBed } from '@angular/core/testing';

import { MobileSoundboardMenuService } from './mobile-soundboard-menu.service';

describe('MobileSoundboardMenuService', () => {
  let service: MobileSoundboardMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MobileSoundboardMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
