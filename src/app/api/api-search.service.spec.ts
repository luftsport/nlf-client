import { TestBed } from '@angular/core/testing';

import { ApiSearchService } from './api-search.service';

describe('ApiSearchService', () => {
  let service: ApiSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
