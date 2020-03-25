import { TestBed } from '@angular/core/testing';

import { ApiAirportsService } from './api-airports.service';

describe('ApiAirportsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiAirportsService = TestBed.get(ApiAirportsService);
    expect(service).toBeTruthy();
  });
});
