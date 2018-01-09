import { TestBed, inject } from '@angular/core/testing';

import { ApiLicensesService } from './api-licenses.service';

describe('LicensesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiLicensesService]
    });
  });

  it('should be created', inject([ApiLicensesService], (service: ApiLicensesService) => {
    expect(service).toBeTruthy();
  }));
});
