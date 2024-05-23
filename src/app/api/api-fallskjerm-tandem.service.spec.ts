import { TestBed } from '@angular/core/testing';

import { ApiFallskjermTandemService } from './api-fallskjerm-tandem.service';

describe('ApiFallskjermTandemService', () => {
  let service: ApiFallskjermTandemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiFallskjermTandemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
