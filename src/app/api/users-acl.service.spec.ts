import { TestBed, inject } from '@angular/core/testing';

import { UsersAclService } from './users-acl.service';

describe('UsersAclService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersAclService]
    });
  });

  it('should be created', inject([UsersAclService], (service: UsersAclService) => {
    expect(service).toBeTruthy();
  }));
});
