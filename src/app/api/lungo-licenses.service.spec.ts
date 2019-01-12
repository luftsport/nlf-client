import { TestBed } from '@angular/core/testing';

import { LungoLicensesService } from './lungo-licenses.service';

describe('LungoLicensesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LungoLicensesService = TestBed.get(LungoLicensesService);
    expect(service).toBeTruthy();
  });
});
