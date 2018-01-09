import { TestBed, inject } from '@angular/core/testing';

import { ApiNlfClubsService } from './api-nlf-clubs.service';

describe('NlfClubsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiNlfClubsService]
    });
  });

  it('should be created', inject([ApiNlfClubsService], (service: ApiNlfClubsService) => {
    expect(service).toBeTruthy();
  }));
});
