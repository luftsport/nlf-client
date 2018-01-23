import { TestBed, inject } from '@angular/core/testing';

import { ApiCacheService } from './api-cache.service';

describe('ApiCacheService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiCacheService]
    });
  });

  it('should be created', inject([ApiCacheService], (service: ApiCacheService) => {
    expect(service).toBeTruthy();
  }));
});
