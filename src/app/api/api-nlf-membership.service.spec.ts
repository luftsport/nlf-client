import { TestBed, inject } from '@angular/core/testing';

import { ApiNlfMembershipService } from './api-nlf-membership.service';

describe('ApiNlfMembershipService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiNlfMembershipService]
    });
  });

  it('should be created', inject([ApiNlfMembershipService], (service: ApiNlfMembershipService) => {
    expect(service).toBeTruthy();
  }));
});
