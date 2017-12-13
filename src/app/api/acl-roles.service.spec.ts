import { TestBed, inject } from '@angular/core/testing';

import { AclRolesService } from './acl-roles.service';

describe('AclRolesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AclRolesService]
    });
  });

  it('should be created', inject([AclRolesService], (service: AclRolesService) => {
    expect(service).toBeTruthy();
  }));
});
