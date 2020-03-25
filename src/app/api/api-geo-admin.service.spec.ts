import { TestBed } from '@angular/core/testing';

import { ApiGeoAdminService } from './api-geo-admin.service';

describe('ApiGeoAdminService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiGeoAdminService = TestBed.get(ApiGeoAdminService);
    expect(service).toBeTruthy();
  });
});
