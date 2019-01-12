import { TestBed } from '@angular/core/testing';

import { LungoCountiesService } from './lungo-counties.service';

describe('LungoCountiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LungoCountiesService = TestBed.get(LungoCountiesService);
    expect(service).toBeTruthy();
  });
});
