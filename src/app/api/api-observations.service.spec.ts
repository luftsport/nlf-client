import { TestBed, inject } from '@angular/core/testing';

import { ApiObservationsService } from './api-observations.service';

describe('ObservationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiObservationsService]
    });
  });

  it('should be created', inject([ApiObservationsService], (service: ApiObservationsService) => {
    expect(service).toBeTruthy();
  }));
});
