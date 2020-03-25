import { TestBed } from '@angular/core/testing';

import { ApiE5XChoicesService } from './api-e5x-choices.service';

describe('ApiE5XChoicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiE5XChoicesService = TestBed.get(ApiE5XChoicesService);
    expect(service).toBeTruthy();
  });
});
