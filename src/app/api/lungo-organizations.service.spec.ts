import { TestBed } from '@angular/core/testing';

import { LungoOrganizationsService } from './lungo-organizations.service';

describe('LungoOrganizationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LungoOrganizationsService = TestBed.get(LungoOrganizationsService);
    expect(service).toBeTruthy();
  });
});
