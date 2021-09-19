import { TestBed } from '@angular/core/testing';

import { ZaposlenService } from './zaposlen.service';

describe('ZaposlenService', () => {
  let service: ZaposlenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZaposlenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
