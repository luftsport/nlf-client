import { TestBed, inject } from '@angular/core/testing';

import { ApiClubsService } from './api-clubs.service';

describe('ApiClubsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiClubsService]
    });
  });

  it('should be created', inject([ApiClubsService], (service: ApiClubsService) => {
    expect(service).toBeTruthy();
  }));
});
