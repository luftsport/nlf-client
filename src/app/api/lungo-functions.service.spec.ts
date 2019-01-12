import { TestBed } from '@angular/core/testing';

import { LungoFunctionsService } from './lungo-functions.service';

describe('LungoFunctionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LungoFunctionsService = TestBed.get(LungoFunctionsService);
    expect(service).toBeTruthy();
  });
});
