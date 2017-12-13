import { TestBed, inject } from '@angular/core/testing';

import { ObservationCommentsService } from './observation-comments.service';

describe('ObservationCommentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ObservationCommentsService]
    });
  });

  it('should be created', inject([ObservationCommentsService], (service: ObservationCommentsService) => {
    expect(service).toBeTruthy();
  }));
});
