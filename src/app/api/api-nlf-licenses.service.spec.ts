import { TestBed, inject } from '@angular/core/testing';

import { ApiNlfLicensesService } from './api-nlf-licenses.service';

describe('NlfLicensesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiNlfLicensesService]
    });
  });

  it('should be created', inject([ApiNlfLicensesService], (service: ApiNlfLicensesService) => {
    expect(service).toBeTruthy();
  }));
});
