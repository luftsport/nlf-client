import { TestBed } from '@angular/core/testing';

import { ApiDistinctService } from './api-distinct.service';

describe('ApiDistinctService', () => {
  let service: ApiDistinctService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiDistinctService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
