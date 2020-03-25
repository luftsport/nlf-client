import { TestBed } from '@angular/core/testing';

import { ApiAircraftsService } from './api-aircrafts.service';

describe('ApiAircraftsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiAircraftsService = TestBed.get(ApiAircraftsService);
    expect(service).toBeTruthy();
  });
});
