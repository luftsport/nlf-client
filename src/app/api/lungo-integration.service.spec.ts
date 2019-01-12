import { TestBed } from '@angular/core/testing';

import { LungoService } from './lungo-integration.service';

describe('LungoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LungoService = TestBed.get(LungoService);
    expect(service).toBeTruthy();
  });
});
