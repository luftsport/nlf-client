import { TestBed, inject } from '@angular/core/testing';

import { ObservationComponentsService } from './observation-components.service';

describe('ObservationComponentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ObservationComponentsService]
    });
  });

  it('should be created', inject([ObservationComponentsService], (service: ObservationComponentsService) => {
    expect(service).toBeTruthy();
  }));
});
