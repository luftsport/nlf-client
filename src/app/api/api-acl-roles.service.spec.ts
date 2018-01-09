import { TestBed, inject } from '@angular/core/testing';

import { ApiAclRolesService } from './api-acl-roles.service';

describe('AclRolesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiAclRolesService]
    });
  });

  it('should be created', inject([ApiAclRolesService], (service: ApiAclRolesService) => {
    expect(service).toBeTruthy();
  }));
});
