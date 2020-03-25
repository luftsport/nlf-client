import { TestBed } from '@angular/core/testing';

import { ApiE5xTreeService } from './api-e5x-tree.service';

describe('ApiE5xTreeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiE5xTreeService = TestBed.get(ApiE5xTreeService);
    expect(service).toBeTruthy();
  });
});
