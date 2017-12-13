import { TestBed, inject } from '@angular/core/testing';

import { ObservationTemplatesService } from './observation-templates.service';

describe('ObservationTemplatesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ObservationTemplatesService]
    });
  });

  it('should be created', inject([ObservationTemplatesService], (service: ObservationTemplatesService) => {
    expect(service).toBeTruthy();
  }));
});
