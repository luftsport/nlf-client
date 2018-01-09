import { TestBed, inject } from '@angular/core/testing';

import { ApiAclGroupsService } from './api-acl-groups.service';

describe('ApiAclGroupsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiAclGroupsService]
    });
  });

  it('should be created', inject([ApiAclGroupsService], (service: ApiAclGroupsService) => {
    expect(service).toBeTruthy();
  }));
});
