import { TestBed } from '@angular/core/testing';

import { ApiE5XAttributesService } from './api-e5x-attributes.service';

describe('ApiE5XAttributesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiE5XAttributesService = TestBed.get(ApiE5XAttributesService);
    expect(service).toBeTruthy();
  });
});
