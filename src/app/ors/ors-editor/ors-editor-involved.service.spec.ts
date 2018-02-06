import { TestBed, inject } from '@angular/core/testing';

import { NlfOrsEditorInvolvedService } from './ors-editor-involved.service';

describe('NlfOrsEditorInvolvedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NlfOrsEditorInvolvedService]
    });
  });

  it('should be created', inject([NlfOrsEditorInvolvedService], (service: NlfOrsEditorInvolvedService) => {
    expect(service).toBeTruthy();
  }));
});
