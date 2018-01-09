import { TestBed, inject } from '@angular/core/testing';

import { ApiObservationCommentsService } from './api-observation-comments.service';

describe('ObservationCommentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiObservationCommentsService]
    });
  });

  it('should be created', inject([ApiObservationCommentsService], (service: ApiObservationCommentsService) => {
    expect(service).toBeTruthy();
  }));
});
