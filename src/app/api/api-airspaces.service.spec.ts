import { TestBed } from '@angular/core/testing';

import { ApiAirspacesService } from './api-airspaces.service';

describe('ApiAirspacesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiAirspacesService = TestBed.get(ApiAirspacesService);
    expect(service).toBeTruthy();
  });
});
