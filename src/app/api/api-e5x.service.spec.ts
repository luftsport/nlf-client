import { TestBed } from '@angular/core/testing';

import { ApiE5xService } from './api-e5x.service';

describe('ApiE5xService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiE5xService = TestBed.get(ApiE5xService);
    expect(service).toBeTruthy();
  });
});
