import { TestBed } from '@angular/core/testing';

import { ApiAclService } from './api-acl.service';

describe('ApiAclService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiAclService = TestBed.get(ApiAclService);
    expect(service).toBeTruthy();
  });
});
