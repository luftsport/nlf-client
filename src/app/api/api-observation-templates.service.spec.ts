import { TestBed, inject } from '@angular/core/testing';

import { ApiObservationTemplatesService } from './api-observation-templates.service';

describe('ObservationTemplatesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiObservationTemplatesService]
    });
  });

  it('should be created', inject([ApiObservationTemplatesService], (service: ApiObservationTemplatesService) => {
    expect(service).toBeTruthy();
  }));
});
