import { TestBed, inject } from '@angular/core/testing';

import { MelwinClubsService } from './melwin-clubs.service';

describe('MelwinClubsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MelwinClubsService]
    });
  });

  it('should be created', inject([MelwinClubsService], (service: MelwinClubsService) => {
    expect(service).toBeTruthy();
  }));
});
