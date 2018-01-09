import { TestBed, inject } from '@angular/core/testing';

import { ApiUsersAclService } from './api-users-acl.service';

describe('ApiUsersAclService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiUsersAclService]
    });
  });

  it('should be created', inject([ApiUsersAclService], (service: ApiUsersAclService) => {
    expect(service).toBeTruthy();
  }));
});
