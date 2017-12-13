import { TestBed, inject } from '@angular/core/testing';

import { MelwinMembershipService } from './melwin-membership.service';

describe('MelwinMembershipService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MelwinMembershipService]
    });
  });

  it('should be created', inject([MelwinMembershipService], (service: MelwinMembershipService) => {
    expect(service).toBeTruthy();
  }));
});
