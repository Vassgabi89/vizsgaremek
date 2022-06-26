import { TestBed } from '@angular/core/testing';

import { MyticketsService } from './mytickets.service';

describe('MyticketsService', () => {
  let service: MyticketsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyticketsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
