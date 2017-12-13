import { TestBed, inject } from '@angular/core/testing';

import { AclGroupsService } from './acl-groups.service';

describe('AclGroupsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AclGroupsService]
    });
  });

  it('should be created', inject([AclGroupsService], (service: AclGroupsService) => {
    expect(service).toBeTruthy();
  }));
});
