import { TestBed } from '@angular/core/testing';

import { LungoCountriesService } from './lungo-countries.service';

describe('LungoCountriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LungoCountriesService = TestBed.get(LungoCountriesService);
    expect(service).toBeTruthy();
  });
});
