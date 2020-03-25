import { TestBed } from '@angular/core/testing';

import { ApiNlfMetService } from './api-nlf-met.service';

describe('ApiNlfMetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiNlfMetService = TestBed.get(ApiNlfMetService);
    expect(service).toBeTruthy();
  });
});
