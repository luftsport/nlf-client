import { TestBed, inject } from '@angular/core/testing';

import { ApiObservationComponentsService } from './observation-components.service';

describe('ObservationComponentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiObservationComponentsService]
    });
  });

  it('should be created', inject([ApiObservationComponentsService], (service: ApiObservationComponentsService) => {
    expect(service).toBeTruthy();
  }));
});
