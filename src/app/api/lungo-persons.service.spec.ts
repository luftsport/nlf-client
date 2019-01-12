import { TestBed } from '@angular/core/testing';

import { LungoPersonsService } from './lungo-persons.service';

describe('LungoPersonsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LungoPersonsService = TestBed.get(LungoPersonsService);
    expect(service).toBeTruthy();
  });
});
