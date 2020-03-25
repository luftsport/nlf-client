import { TestBed } from '@angular/core/testing';

import { ApiLocationsService } from './api-locations.service';

describe('ApiLocationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiLocationsService = TestBed.get(ApiLocationsService);
    expect(service).toBeTruthy();
  });
});
