import { TestBed, inject } from '@angular/core/testing';

import { ObservationsService } from './observations.service';

describe('ObservationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ObservationsService]
    });
  });

  it('should be created', inject([ObservationsService], (service: ObservationsService) => {
    expect(service).toBeTruthy();
  }));
});
