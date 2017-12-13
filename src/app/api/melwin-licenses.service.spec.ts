import { TestBed, inject } from '@angular/core/testing';

import { MelwinLicensesService } from './melwin-licenses.service';

describe('MelwinLicensesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MelwinLicensesService]
    });
  });

  it('should be created', inject([MelwinLicensesService], (service: MelwinLicensesService) => {
    expect(service).toBeTruthy();
  }));
});
