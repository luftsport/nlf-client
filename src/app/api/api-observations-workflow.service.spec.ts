import { TestBed, inject } from '@angular/core/testing';

import { ApiObservationsWorkflowService } from './api-observations-workflow.service';

describe('ApiObservationsWorkflowService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiObservationsWorkflowService]
    });
  });

  it('should be created', inject([ApiObservationsWorkflowService], (service: ApiObservationsWorkflowService) => {
    expect(service).toBeTruthy();
  }));
});
