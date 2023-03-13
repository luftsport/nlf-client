import { TestBed } from '@angular/core/testing';

import { LungoPaymentsService } from './lungo-payments.service';

describe('LungoPaymentsService', () => {
  let service: LungoPaymentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LungoPaymentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
